import {useParams} from 'react-router-dom';
import axios from 'axios';

import useContentData from 'hooks/useContentData';
import UserLesson from 'components/UserLesson';
import { getCourseById, isActiveSubscriber } from '../helpers/selectors';
import useSubscriptionData from 'hooks/useSubscriptionData';

const CoursePage = (props) => {

  const { courseId } = useParams();
  //we need to get all the lessons with this course id from the database
  const {lessons} = useContentData(courseId);
  //we need to get all the subscriptions for the given useId and courseId
  const {subscriptions, setSubscription} = useSubscriptionData(props.state.token.userId, courseId);

  const course = getCourseById(courseId, props.state.courses);
  const subscriptionBased = course && course.subscription_based;

  console.log(subscriptions);

    let LessonsList = [];
    let isSubscriptionActive

    if (!subscriptionBased) {
      //if the course is not subscription based then give the user access to all the lessons
      LessonsList = lessons.map(lesson => <UserLesson key={lesson.id} lesson={lesson} access={true}/>)
    } else {
      //if the course is subscription based
      //we need to check if the user has an active subscription for it or not
      //if they have active subscription, show them the 'cancel subscription' button instead of
      //the 'subscribe' button
      isSubscriptionActive = isActiveSubscriber(subscriptions);
      // we need to give the user access only to the lessons in their subscription periods
      //Any lesson outside subscription periods must be locked with a 'buy now' button to
      //purchase the item
      LessonsList = lessons.map(lesson => {
        const lessonReleaseDate = lesson.release_date;
        for (const subscription of subscriptions) {
          console.log(subscription.start_date, subscription.end_date, lessonReleaseDate)
          if (subscription.start_date < lessonReleaseDate && 
            (lessonReleaseDate < subscription.end_date || subscription.end_date === null)) {
              return <UserLesson key={lesson.id} lesson={lesson} access={true} />
            }
        }
        return <UserLesson key={lesson.id} lesson={lesson} access={false} />;
      });

    }

    
  const handleSubscription = () => {
    axios.post('/api/subscriptions', {
      user_id: props.state.token.userId,
      course_id: courseId
    })
    .then(result => {
      const newSubscription = result.data;
      setSubscription(newSubscription);
    })
    .catch(error => console.log(error, 'didn not subscribe successfully'));

  };

  
  return (
    <div>
      Content of course with id: {courseId}

      {/* we should see one of these buttons if the couse is subscription based */}
      {subscriptionBased && <>
        {!isSubscriptionActive && <button onClick={handleSubscription}>Subscribe!</button>}
        {isSubscriptionActive && <button>Cancel subscription!</button>}
      </>}

      {LessonsList}
      


    </div>
  );
};


export default CoursePage;