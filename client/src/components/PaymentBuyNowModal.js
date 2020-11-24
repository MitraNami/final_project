import axios from 'axios';

import PaymentModal from 'components/PaymentModal';

const PaymentBuyNowModal = (props) => {

  const {
    modalIsOpen, 
    setModalIsOpen,
    price,
    lesson,
    userId,
    subscriptions,
    setSubscription
    } = props;


  const handlePurchase = (evt) => {
    evt.preventDefault();
    // On successful payment, store the new purchase as a subscription in the past
    //a two minute interval centered at release date
    const releaseDate = new Date(lesson.release_date).getTime();
    const startDate = new Date(releaseDate - 60000);
    const endDate = new Date(releaseDate + 60000);

    axios.post('/api/subscriptions', {
      user_id: userId,
      course_id: lesson.course_id,
      start_date: startDate,
      end_date: endDate
    })
    .then(result => {
      const newSubscription = result.data;
      setSubscription([...subscriptions, newSubscription]);
      setModalIsOpen(false);
    })
    .catch(error => console.log(error, 'did not purchase successfully'));
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


export default PaymentBuyNowModal;