import {useState} from 'react';

import axios from 'axios';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const SubscriptionModal = (props) => {

  const [state, setState] = useState({
    name: ''
  });

  const {
    modalIsOpen,
    setModalIsOpen, 
    userId, 
    courseId,
    subscriptions,
    setSubscription} = props;

  const handleSubscription = (evt) => {
    evt.preventDefault();
    axios.post('/api/subscriptions', {
      user_id: userId,
      course_id: courseId
    })
      .then(result => {
        const newSubscription = result.data;
        setSubscription([...subscriptions, newSubscription]);
        setModalIsOpen(false);
      })
      .catch(error => console.log(error, 'did not subscribe successfully'));
  };

  const handleChange = (evt) => {

  } 

  return(
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <form onSubmit={handleSubscription}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={state.name} onChange={handleChange} required/>

        <button type="submit" onClick={handleSubscription}>Subscribe</button>
      </form>

      <button className="btn btn-outline-dark btn-lg" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
    </Modal>
  );


};



export default SubscriptionModal;