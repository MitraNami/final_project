import { useParams } from 'react-router-dom';
import axios from 'axios';

import useContentData from 'hooks/useContentData';
import useSubscriptionData from 'hooks/useSubscriptionData';
import UserLesson from 'components/UserLesson';
import CancelSubModal from 'components/CancelSubModal';
import { getCourseById, isActiveSubscriber } from '../helpers/selectors';


const CoursePage = (props) => {

  const { courseId } = useParams();
  //we need to get all the lessons with this course id from the database
  const { lessons } = useContentData(courseId);
  //we need to get all the subscriptions for the given useId and courseId
  const {
    subscriptions,
    setSubscription,
    cancelSubModalShow,
    setCancelSubModalShow
  } = useSubscriptionData(props.state.token.userId, courseId);

  const course = getCourseById(courseId, props.state.courses);
  const subscriptionBased = course && course.subscription_based;

  let LessonsList = [];
  let isSubscriptionActive;
  let activeSubscriptionId;

  if (!subscriptionBased) {
    //if the course is not subscription based then give the user access to all the lessons
    LessonsList = lessons.map(lesson => <UserLesson key={lesson.id} lesson={lesson} access={true} />)
  } else {
    //if the course is subscription based
    //we need to check if the user has an active subscription for it or not
    //if they have active subscription, show them the 'cancel subscription' button instead of
    //the 'subscribe' button
    [isSubscriptionActive, activeSubscriptionId] = isActiveSubscriber(subscriptions);
    // we need to give the user access only to the lessons in their subscription periods
    //Any lesson outside subscription periods must be locked with a 'buy now' button to
    //purchase the item
    LessonsList = lessons.map(lesson => {
      const lessonReleaseDate = lesson.release_date;
      for (const subscription of subscriptions) {
        if (subscription.start_date < lessonReleaseDate &&
          (lessonReleaseDate < subscription.end_date || subscription.end_date === null)) {
          return <UserLesson key={lesson.id} lesson={lesson} access={true} />
        }
      } //The user should be able to gain access by purchasing the lesson
      //so we need to pass down additional props to handle purchase
      return <UserLesson
        key={lesson.id}
        lesson={lesson}
        access={false}
        userId={props.state.token.userId}
        subscriptions={subscriptions}
        setSubscription={setSubscription}
      />;
    });

  }


  const handleSubscription = () => {
    axios.post('/api/subscriptions', {
      user_id: props.state.token.userId,
      course_id: courseId
    })
      .then(result => {
        const newSubscription = result.data;
        setSubscription([...subscriptions, newSubscription]);
      })
      .catch(error => console.log(error, 'did not subscribe successfully'));

  };

  const handleCancellation = () => {
    setCancelSubModalShow(true);
  };


  return (
    <div>
      Content of course with id: {courseId}

      {/* we should see one of these buttons if the course is subscription based */}
      {subscriptionBased && <>
        {!isSubscriptionActive && <button onClick={handleSubscription}>Subscribe!</button>}
        {isSubscriptionActive && <button onClick={handleCancellation}>Cancel subscription!</button>}
        <CancelSubModal
          modalIsOpen={cancelSubModalShow}
          setModalIsOpen={setCancelSubModalShow}
          subscriptions={subscriptions}
          activeSubscriptionId={activeSubscriptionId}
          setSubscription={setSubscription}
        />
      </>}

      {LessonsList}

    </div>
  );
};


export default CoursePage;