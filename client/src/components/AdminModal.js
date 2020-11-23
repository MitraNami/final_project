import Modal from 'react-modal';

Modal.setAppElement('#root');

const AdminModal = (props) => {
  const {modalIsOpen, setModalIsOpen} = props;

  const handleSendMsg = () => {
    console.log('send msg to admin');
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
      <h4>You need to request registration. Do you want to send a request to
      admin to be registered?
      </h4>
      <br />
      <div className="container d-flex flex-row justify-content-around">
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={handleSendMsg}>OK</button>
        <button className="btn btn-outline-dark btn-lg" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </Modal>

  );
};


export default AdminModal;