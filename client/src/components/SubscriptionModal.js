import {useState} from 'react';

import axios from 'axios';
import Modal from 'react-modal';

import '../style/modal.css';

Modal.setAppElement('#root');

const SubscriptionModal = (props) => {

  const [state, setState] = useState({
    name: '',
    cardNumber: '',
    exp: '',
    cvc: ''
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
        setState(prev => ({name: '', cardNumber: '', exp: '', cvc: ''}));
        setModalIsOpen(false);
      })
      .catch(error => console.log(error, 'did not subscribe successfully'));
  };

  const handleChange = (evt) => {
    setState(prev => ({...prev, [evt.target.name]: evt.target.value }));
  }; 

  return(
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="Paymentmodal"
      overlayClassName="Overlay"
    >
      <div className="container">
        <form onSubmit={handleSubscription} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" className="form-control" type="text" name="name" value={state.name} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Card number</label>
            <input id="cardNumber" className="form-control" type="text" name="cardNumber" value={state.cardNumber} onChange={handleChange} required/>
          </div>
          <div className="d-flex flex-row form-group">
            <input id="exp" className="form-control" type="text" name="exp" placeholder="YY/MM" value={state.exp} onChange={handleChange} required/>
            <input id="cvc" className="form-control" type="text" name="cvc" placeholder="CVC" value={state.cvc} onChange={handleChange} required/>
          </div>
          <button className="btn btn-sm btn-outline-dark" type="submit">Subscribe</button>
        </form>
      </div>
    </Modal>
  );


};



export default SubscriptionModal;