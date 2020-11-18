import { useParams, useHistory, Redirect } from 'react-router-dom';

import useRegistrationData from 'hooks/useRegistrationData';
import { isRegisteredForACourse, getCourseById } from '../helpers/selectors';

import SignupLoginModal from 'components/SignupLoginModal';
import AdminModal from 'components/AdminModal';


const CourseHomePage = (props) => {
  const { courseId } = useParams();

  const history = useHistory();
  const { registrations, registerUser, setModalShow, modalShow,
    redirectToContent, setRedirectToContent, adminModalShow,
    setAdminModalShow } = useRegistrationData();

  //if the user is not logged(id null) or not registered in the course, is Registered will be false
  //if the user is logged in and registered it would be true
  const isRegistered = props.state.token ?
    isRegisteredForACourse(props.state.token.userId, courseId, registrations) : false;

  const course = getCourseById(courseId, props.state.courses);
  console.log(course);


  const handleClick = () => {
    if (props.state.token) {
      //the user is logged in and not registered to the course
      //you need to register them in the course, there are three possibilities

      if (course.authorized === true && course.price === 0) {
        //register the user, and on successful registration to the database
        //take them to the content page of the course
        registerUser(props.state.token.userId, courseId)
          .then(() => setRedirectToContent(true))
          .catch(error => console.log(error, 'didn not registered successfully'));

      } else if (course.authorized === true && course.price !== 0) {
        //take them to payment page, on successful payment, reister them, take them to content page
        console.log('to pyament page');

      } else if (course.authorized === false) {
        //User can not register in this course, display a modal to send a 
        //registration request to admin
        setAdminModalShow(true);
      }

    } else {
      //the user is not logged in, show them signup/login modal
      setModalShow(true);
    }

  };

  const handleContentRender = () => {
    setRedirectToContent(true);
  }

  return (
    <div>
      Home page of course: {course.title} <br /> {course.description}
      {!isRegistered && <button type="submit" className="btn btn-primary" onClick={handleClick}>Start the Course!</button>}
      {isRegistered && <button type="submit" className="btn btn-primary" onClick={handleContentRender}>Continue the Course!</button>}
      {modalShow && <SignupLoginModal cancelModal={setModalShow} />}
      {adminModalShow && <AdminModal cancelModal={setAdminModalShow} />}
      {redirectToContent && <Redirect push to={`/courses/${courseId}/content`} />}
    </div>
  )
};


export default CourseHomePage;