
import {Link} from 'react-router-dom';

const Navbar = (props) => {

  const isAuth = props.state.token;
  const type = isAuth && props.state.token.userType;

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
        {type === 'client' ? <li><Link to="/users/account">My Account</Link></li> : <li><Link to="/admin/account">Admin Account</Link></li>}
        <li><span onClick={handleLogout}>Logout</span></li>
        </>}
      </ul>

    </nav>
  );
};


export default Navbar