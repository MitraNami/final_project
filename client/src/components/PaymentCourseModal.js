
import PaymentModal from 'components/PaymentModal';

const PaymentCourseModal = (props) => {

  const {
    modalIsOpen, 
    setModalIsOpen,
    price,
    registerUser,
    userId,
    courseId,
    setRedirectToContent
    } = props;


  const handlePurchase = (evt) => {
    evt.preventDefault();
    // On successful payment, reister the user, take them to content page
    registerUser(userId, courseId)
      .then(() => setRedirectToContent(true))
      .catch(error => console.log(error, 'didn not registered successfully'));
  };

  return(
    <PaymentModal 
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen} 
      price={price}
      handleForm={handlePurchase}
      />
  );

};


export default PaymentCourseModal;