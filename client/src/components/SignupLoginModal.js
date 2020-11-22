import {useHistory} from 'react-router-dom';
import Modal from 'react-modal';

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
    
      <Modal isOpen={modalIsOpen}>

        <h4>You need to login or signup first:</h4>
        <button type="submit" onClick={handleLogin}>Login</button>
        <br />
        <button type="submit" onClick={handleSignup}>Signup</button>
        <br />
        <button type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
      
      </Modal>
    
  );
}


export default SignupLoginModal;