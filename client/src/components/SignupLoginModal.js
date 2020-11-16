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
        modal contents
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="submit" onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}


export default SignupLoginModal;