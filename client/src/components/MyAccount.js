
import {
  Link,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom';

import UserCourses from 'components/UserCourses';


const MyAccount = (props) => {

  const courses = props.state.courses;
  const userId = props.state.token.userId;

  const {path, url} = useRouteMatch();

  return(
    <div>
      <div  className="container">
        <ul className="row bg-light" style={{listStyleType: 'none'}}>
          <li className="col-sm">
            <Link to={`${url}/profile`}>Edit profile</Link>
          </li>
          <li className="col-sm">
            <Link to={`${url}/courses`}>Enrolled courses</Link>
          </li>
          <li className="col-sm">
            <Link to={`${url}/invoices`}>My invoices</Link>
          </li>
      </ul>
      </div>

      <Switch>
        <Route exact path={path}>
          <h3>Welcome to your account!!</h3>
        </Route>
        <Route exact path={`${path}/courses`}>
          <UserCourses userId={userId} courses={courses} />
        </Route>

      </Switch>
    </div>
  );

};


export default MyAccount;