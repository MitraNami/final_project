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
    <div className="d-flex flex-row justify-content-start pt-5 pl-5">
      <img src="https://picsum.photos/seed/picsum/200/200" alt="video" />
      <div className="d-flex flex-column justify-content-between pl-3">
        <span>pdf file</span>
        <button className="btn btn-primary">Buy now!</button>
      </div>
    </div>
     
    <div className="d-flex flex-row justify-content-start pt-5 pl-5">
      <img src="https://picsum.photos/id/237/200/200" alt="video" />
      <div className="d-flex flex-column justify-content-between pl-3">
        <span>pdf file</span>
        <button className="btn btn-primary">Buy now!</button>
      </div>
    </div>


    </div>
  );
};


export default CoursePage;