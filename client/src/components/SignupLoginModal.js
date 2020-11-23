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
        <h4>You need to login or signup first:</h4>
        <br />
        <div className="container d-flex flex-column">
          <button className="btn btn-outline-dark btn-lg" type="submit" onClick={handleLogin}>Login</button>
          <br />
          <button className="btn btn-outline-dark btn-lg" type="submit" onClick={handleSignup}>Signup</button>
          <br />
          <button className="btn btn-outline-dark btn-lg" type="submit" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      
      </Modal>
    
  );
}


export default SignupLoginModal;