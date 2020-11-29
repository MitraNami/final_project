import {useHistory} from 'react-router-dom';
import Modal from 'react-modal';

import '../style/modal.css';

Modal.setAppElement('#root');

const SignupLoginModal = (props) => {
  const history = useHistory();
  const {modalIsOpen, setModalIsOpen} = props;

  const handleLogin = () => {
    history.push('/login');
  };

  const handleSignup = () => {
    history.push('/signup');
  };


  return (
    
      <Modal 
        className="CredentialModal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        >
        <p className="text-center pt-1">You need to login or signup first:</p>
        <br />
        <div className="container d-flex flex-column">
          <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleLogin}>Login</button>
          <br />
          <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleSignup}>Signup</button>
          <br />
          <button className="btn btn-outline-dark btn-sm" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      
      </Modal>
    
  );
}


export default SignupLoginModal;