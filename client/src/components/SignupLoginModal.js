import {useHistory} from 'react-router-dom';

const SignupLoginModal = () => {

  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  return (
    <div className="overlay">
      <div className="content">
        <h4>You need to login or signup first:</h4>
        <button type="submit" onClick={handleLogin}>Login</button>
        <br />
        <button type="submit" onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}


export default SignupLoginModal;