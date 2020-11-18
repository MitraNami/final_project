import {useParams} from 'react-router-dom';

import useContentData from 'hooks/useContentData';
import UserLesson from 'components/UserLesson';
import { getCourseById } from '../helpers/selectors';

const CoursePage = (props) => {

  const { courseId } = useParams();

  const course = getCourseById(courseId, props.state.courses);
  const subscriptionBased = course.subscription_based;
  console.log(subscriptionBased)

   //we need to get all the lessons with this course id from the database
  const {lessons} = useContentData(courseId);
  console.log(lessons);

  
 

    //you needd to go to the lessons table and get all the lessons
    //for this course id; then show them all. if the course is
    //not subscription based then give access to all of them
    //if subscription based only give access to the ones in
    //the sub period. lock the rest with the buy now button
  return (
    <div>
      Content of course with id: {courseId}

      <UserLesson />
      


    </div>
  );
};


export default CoursePage;