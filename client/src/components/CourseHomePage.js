import {useParams, useHistory, Redirect} from 'react-router-dom';

import useRegistrationData from 'hooks/useRegistrationData';
import {isRegisteredForACourse, getCourseById} from '../helpers/selectors';

import SignupLoginModal from 'components/SignupLoginModal';

const CourseHomePage = (props) => {
  const { courseId } = useParams();

  const history = useHistory();
  const {registrations, registerUser, setModalShow, modalShow,
    redirectToContent, setRedirectToContent} = useRegistrationData();

  //if the user is not logged(id null) or not registered in the course, is Registered will be false
  //if the user is logged in and registered it would be true
  const isRegistered = props.state.token ?
   isRegisteredForACourse(props.state.token.userId, courseId, registrations) : false;

  const handleClick = () => {
    if (props.state.token) {
      //the user is logged in and not registered to the course
      //you need to register them in the course, there are three possibilities
      const course = getCourseById(courseId, props.state.courses);
      console.log(course);

      if (course.authorized === true && course.price === 0) {
        //register the user, and on successful registration to the database
        //take them to the content page of the course

        registerUser(props.state.token.userId, courseId)
          .then(() => setRedirectToContent(true))
          .catch(error => console.log(error, 'didn not registered successfully'))


        
      } else if (course.authorized === true && course.price !== 0) {
        console.log('lead the to pyament page');
        //on successful payment, reister them, take them to contenct page
      } else if (course.authorized === false) {
        console.log('send a request msg to admin to be enrolled');

      }
    

    } else {
      //the user is not logged in, show them signup/login modal
      console.log('not logged in');
      setModalShow(true);
      
    }

  };

  const handleContentRender = () => {
    setRedirectToContent(true);
  }

  return(
    <div>
      Home page of course with Id: {courseId}
      {!isRegistered && <button type="submit" className="btn btn-primary" onClick={handleClick}>Start the Course!</button>}
      {isRegistered && <button type="submit" className="btn btn-primary" onClick={handleContentRender}>Continue the Course!</button>}
      {modalShow && <SignupLoginModal />}
      {redirectToContent && <Redirect push to={`/courses/${courseId}/content`} />}
    </div>
  )
};


export default CourseHomePage;