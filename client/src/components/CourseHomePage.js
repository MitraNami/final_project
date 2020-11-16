import {useParams, useHistory} from 'react-router-dom';

import useRegistrationData from 'hooks/useRegistrationData';
import {isRegisteredForACourse, getCourseById} from '../helpers/selectors';

import SignupLoginModal from 'components/SignupLoginModal';

const CourseHomePage = (props) => {
  const { courseId } = useParams();

  const history = useHistory();
  const {registrations, registerUser, setModalShow, modalShow} = useRegistrationData();

  //if the user is not logged(id null) or not registered in the course, is Registered will be false
  //if the user is logged in and registered it would be true
  const isRegistered = props.state.token ?
   isRegisteredForACourse(props.state.token.userId, courseId, registrations) : false;

  const handleClick = () => {
    if (props.state.token) {
      //the user is logged in, so we need to see if they are registered in this course
    
      //you need to register them in the course, there are three possibilities
      const course = getCourseById(courseId, props.state.courses);
      console.log(course);

      if (course.authorized === true && course.price === 0) {
        console.log('just register them')

        registerUser(props.state.token.userId, courseId)
          .then(() => console.log('take them to the content page'))
          .catch(error => console.log('didn not registered successfully'))


        
      } else if (course.authorized === true && course.price !== 0) {
        console.log('lead the to pyament page');
        //on successful payment, reister them, take them to contenct page
      } else if (course.authorized === false) {
        console.log('send a request msg to admin to be enrolled');

      }
    

    } else {
      //the user is not logged in, show them signup/login modal
      setModalShow(true);
      //history.push('/login')
      console.log('not logged in')
    }

  };

  return(
    <div>
      Home page of course with Id: {courseId}
      {!isRegistered && <button type="submit" className="btn btn-primary" onClick={handleClick}>Start the Course!</button>}
      {isRegistered && <button type="submit" className="btn btn-primary" onClick={() => console.log('taken to the content page')}>Continue the Course!</button>}
      {modalShow && <SignupLoginModal />}
    </div>
  )
};


export default CourseHomePage;