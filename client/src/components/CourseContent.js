import {useParams} from 'react-router-dom';
import {useState} from 'react';

const CourseContent = (props) => {

  //const [registration , setRegistration ] = useState(props.token);
  const { courseId } = useParams();

  const handleClick = () => {
    if (props.token) {
      //the user is logged in, so wee need to see if they are registered in this course
      

    } else {
      //the user is not logged in, show them signup/login modal
      console.log('not logged in')
    }

  };

  return(
    <div>
      Home page of course with Id: {courseId}
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Start the Course!</button>
    </div>
  )
};


export default CourseContent;