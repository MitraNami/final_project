
import {Link} from 'react-router-dom';

const Navbar = (props) => {

  const isAuth = props.state.token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.dispatch({type: "SET_TOKEN", token: null});
  };

  return (
    <nav>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/cotact">Contact Us</Link></li>
        {!isAuth && <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>}
        {isAuth && <>
        <li><Link to="/account">My Account</Link></li>
        <li><span onClick={handleLogout}>Logout</span></li>
        </>}
      </ul>

    </nav>
  );
};


export default Navbar