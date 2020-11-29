import Modal from 'react-modal';

import '../style/modal.css';

Modal.setAppElement('#root');

const AdminModal = (props) => {
  const {modalIsOpen, setModalIsOpen} = props;

  const handleSendMsg = () => {
    setModalIsOpen(false);
  };


  return (

    <Modal
      className="AdminModal"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      
    >
      <p className="text-center">
        Do you want to send a request to admin to be registered in this course?
      </p>
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleSendMsg}>OK</button>
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </Modal>

  );
};


export default AdminModal;