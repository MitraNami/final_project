import {useParams} from 'react-router-dom';

const CoursePage = () => {

  const { courseId } = useParams();

    //you needd to go to the lessons table and get all the lessons
    //for this course id; then show them all. if the course is
    //not subscription based then give access to all of them
    //if subscription based only give access to the ones in
    //the sub period. lock the rest with the buy now button
  return (
    <div>
      Content of course with id: {courseId}
    </div>
  );
};


export default CoursePage;