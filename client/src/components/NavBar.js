
import { Link, useHistory } from 'react-router-dom';

const Navbar = (props) => {

  const history = useHistory();

  const isAuth = props.state.token;
  const type = isAuth && props.state.token.userType;

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/'); //redirect to the homepage
    props.dispatch({ type: "SET_TOKEN", token: null });
  };

  return (
    // <nav className="navbar navbar-expand-lg bg-warning mb-4">

    //   <ul className="navbar-nav d-flex flex-row justify-content-between">
    //     <li><Link className="nav-link" to="/">Home</Link></li>
    //     <li><Link className="nav-link" to="/courses">Courses</Link></li>
    //     <li><Link className="nav-link" to="/cotact">Contact Us</Link></li>
    //     {!isAuth && <>
    //     <li><Link className="nav-link" to="/login">Login</Link></li>
    //     <li><Link className="nav-link" to="/signup">Signup</Link></li>
    //     </>}
    //     {isAuth && <>
    //     {type === 'client' ? <li><Link className="nav-link" to="/users/account">My Account</Link></li> : <li><Link className="nav-link" to="/admin/account">Admin Account</Link></li>}
    //     <li><span className="btn btn-outline-primary" role="button" onClick={handleLogout}>Logout</span></li>
    //     </>}
    //   </ul>

    // </nav>
    

    <nav className="navbar navbar-expand-md navbar-light bg-light mb-4 sticky-top" >
      <span className="navbar-brand">StrongerU</span>
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/courses">Courses</Link>
          <Link className="nav-link" to="/cotact">Contact Us</Link>

        </div>
        <div className="navbar-nav ml-auto">
          {!isAuth && <>
            <Link className="nav-item nav-link" to="/login">Login</Link>
            <Link className="nav-item nav-link" to="/signup">Signup</Link>
          </>}
          {isAuth && <>
            {type === 'client' ? <Link className="nav-link" to="/users/account">My Account</Link> : <Link className="nav-link" to="/admin/account">Admin Account</Link>}
            <span className="btn btn-outline-dark" role="button" onClick={handleLogout}>Logout</span>
          </>}
        </div>
      </div>
    </nav>
  );
};


export default Navbar