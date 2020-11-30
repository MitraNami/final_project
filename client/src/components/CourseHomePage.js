import { useParams, Redirect } from 'react-router-dom';

import useRegistrationData from 'hooks/useRegistrationData';
import { isRegisteredForACourse, getCourseById } from '../helpers/selectors';

import SignupLoginModal from 'components/SignupLoginModal';
import AdminModal from 'components/AdminModal';
import PaymentCourseModal from 'components/PaymentCourseModal';
import Logo from 'components/Logo';


const CourseHomePage = (props) => {
  const { courseId } = useParams();

  const {
    registrations,
    registerUser,
    setModalShow,
    modalShow,
    paymentModalShow,
    setPaymentModalShow,
    redirectToContent,
    setRedirectToContent,
    adminModalShow,
    setAdminModalShow } = useRegistrationData();

  //if the user is not logged(id null) or not registered in the course, is Registered will be false
  //if the user is logged in and registered it would be true
  const isRegistered = props.state.token ?
    isRegisteredForACourse(props.state.token.userId, courseId, registrations) : false;

  const course = getCourseById(courseId, props.state.courses);

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
        //take the user to payment modal
        setPaymentModalShow(true);

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
  };

  const createMarkup = msg => {
    return { __html: `${msg}` };
  };

  const courseDes = msg => {
    return <div dangerouslySetInnerHTML={createMarkup(msg)} />;
  };

  
  return (
    <div className="container mb-5">
      <Logo />
    <div className="container border border-info rounded p-3">
      
      <div className="row justify-content-end pr-3 pb-2">
        {!isRegistered && <button type="submit" className="btn btn-danger" onClick={handleClick}>Start the Course!</button>}
        {isRegistered && <button type="submit" className="btn btn-primary" onClick={handleContentRender}>Continue the Course</button>}
      </div>
      <h4 className="text-center">{course && course.title}</h4>
      <div className="p-5 text-justify">
      {course && courseDes(course.description)}
      </div>

      <SignupLoginModal modalIsOpen={modalShow} setModalIsOpen={setModalShow} />
      <AdminModal modalIsOpen={adminModalShow} setModalIsOpen={setAdminModalShow} />
      {course && props.state.token &&
        <PaymentCourseModal
          modalIsOpen={paymentModalShow}
          setModalIsOpen={setPaymentModalShow}
          price={course.price}
          registerUser={registerUser}
          userId={props.state.token.userId}
          courseId={courseId}
          setRedirectToContent={setRedirectToContent}
        />}
      {redirectToContent && <Redirect push to={`/courses/${courseId}/content`} />}
    </div>
    </div>
  )
};


export default CourseHomePage;