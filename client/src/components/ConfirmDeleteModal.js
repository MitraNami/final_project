import Modal from 'react-modal';

Modal.setAppElement('#root');

const ConfirmDeleteModal = (props) => {
  const { modalIsOpen, setModalIsOpen, onDelete } = props;

  const handleDelete = () => {
    onDelete();
    setModalIsOpen(false);
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
      <h4>Are you sure you want to delete?
      </h4>
      <br />
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={handleDelete}>Confirm</button>
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </Modal>

  );
};

export default ConfirmDeleteModal;