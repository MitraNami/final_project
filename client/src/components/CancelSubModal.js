import Modal from 'react-modal';
import axios from 'axios';

import {replaceSubscription } from '../helpers/selectors';

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
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={
        {
          overlay: {
            backgroundColor: '#D3D3D3E6'
          },
          content: {
            color: 'black',
            top: '20%',
            left: '35%',
            width: '30%',
            height: '40%',
            backgroundColor: '#ff99cc',
            border: 'black solid 3px',
            borderRadius: '15px 50px 30px'
          }
        }
      }
    >
      <h4>Are you sure you want to cancel your subscription to this course?
      </h4>
      <br />
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={handleCancellation}>Yes</button>
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={() => setModalIsOpen(false)}>No</button>
      </div>
    </Modal>

  );
};


export default CancelSubModal;