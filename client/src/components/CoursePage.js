import {useParams} from 'react-router-dom';

import useContentData from 'hooks/useContentData';
import UserLesson from 'components/UserLesson';
import { getCourseById } from '../helpers/selectors';

const CoursePage = (props) => {

  const { courseId } = useParams();

  const course = getCourseById(courseId, props.state.courses);
  const subscriptionBased = course && course.subscription_based;
  
   //we need to get all the lessons with this course id from the database
  const {lessons} = useContentData(courseId);
  console.log(lessons);

    //if the course is
    //not subscription based then give access to all of them

    let LessonsList = [];
    if (!subscriptionBased) {
      LessonsList = lessons.map(lesson => <UserLesson key={lesson.id} lesson={lesson} access={true}/>)
    } else {
      LessonsList = lessons.map(lesson => {
        const lessonReleaseDate = lesson.release_date;
        console.log(lessonReleaseDate)
        return <UserLesson key={lesson.id} lesson={lesson} access={false} />;
      });
    }



    //if subscription based only give access to the ones in
    //the sub period. lock the rest with the buy now button
  return (
    <div>
      Content of course with id: {courseId}

      {LessonsList}
      


    </div>
  );
};


export default CoursePage;