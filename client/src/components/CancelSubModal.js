import Modal from 'react-modal';
import axios from 'axios';

import {replaceSubscription } from '../helpers/selectors';

import '../style/modal.css';

Modal.setAppElement('#root');

const CancelSubModal = (props) => {
  const {modalIsOpen, setModalIsOpen, activeSubscriptionId, setSubscription, subscriptions} = props;

  const handleCancellation = () => {
    axios.put(`/api/subscriptions/${activeSubscriptionId}`)
    .then(result => {
      const updatedSubscription = result.data;
      //replace the old subscription with the updated one in the state
      const updatedSubscriptions = replaceSubscription([...subscriptions], updatedSubscription, activeSubscriptionId);
      setSubscription(updatedSubscriptions);
      setModalIsOpen(false);
    })
    .catch(error => console.log(error, 'did not unsubscribe successfully'));
  };

  return (

    <Modal
      className="CancelSub"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <p className="text-center pt-1">Are you sure you want to cancel your subscription?
      </p>
      <br />
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleCancellation}>Yes</button>
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={() => setModalIsOpen(false)}>No</button>
      </div>
    </Modal>

  );
};


export default CancelSubModal;