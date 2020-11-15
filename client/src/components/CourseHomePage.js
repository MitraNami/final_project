import {useParams} from 'react-router-dom';

import useRegistrationData from 'hooks/useRegistrationData';
import {isRegisteredForACourse, getCourseById} from '../helpers/selectors';

const CourseHomePage = (props) => {
  const { courseId } = useParams();
  const {registrations, registerUser} = useRegistrationData();

  const handleClick = () => {
    if (props.state.token) {
      //the user is logged in, so we need to see if they are registered in this course
      if (isRegisteredForACourse(props.state.token.userId, courseId, registrations)) {
      
        //show them the contenct of the course
      } else {
        //you need to register them in the course, there are three possibilities
        const course = getCourseById(courseId, props.state.courses);
        console.log(course);
        if (course.authorized === true && course.price === 0) {
          console.log('just register them')
          registerUser(props.state.token.userId)
          //take them to content page
        } else if (course.authorized === true && course.price !== 0) {
          console.log('lead the to pament page');
          //on successful payment, reister them, take them to contenct page
        } else if (course.authorized === false) {
          console.log('send a request msg to admin to be enrolled');

        }
      }

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


export default CourseHomePage;