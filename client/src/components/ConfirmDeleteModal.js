import Modal from 'react-modal';

import 'style/modal.css';

Modal.setAppElement('#root');

const ConfirmDeleteModal = (props) => {
  const { modalIsOpen, setModalIsOpen, onDelete } = props;

  const handleDelete = () => {
    onDelete();
    setModalIsOpen(false);
  };

  return (
    <Modal
      className="AdminDeleteModal"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <p className="text-center">Are you sure you want to delete?</p>
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleDelete}>Confirm</button>
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </Modal>

  );
};

export default ConfirmDeleteModal;