
import {
  Link,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom';


const MyAccount = () => {

  const {path, url} = useRouteMatch();

  return(
    <div>
      <aside>
        <ul>
          <li>
            <Link to={`${url}/profile`}>Edit profile</Link>
          </li>
          <li>
            <Link to={`${url}/courses`}>Enrolled courses</Link>
          </li>
          <li>
            <Link to={`${url}/subscriptions`}>Manage Subscription</Link>
          </li>
          <li>
            <Link to={`${url}/invoices`}>My invoices</Link>
          </li>
        </ul>
      </aside>

      <Switch>
        <Route exact path={path}>
          <h3>Welcome to your account!!</h3>
        </Route>
        <Route exact path={`${path}/courses`}>
          <h3>A list of enrolled courses</h3>
        </Route>
        <Route exact path={`${path}/subscriptions`}>
          <h3>A list of subscriptions</h3>
        </Route>

      </Switch>
    </div>
  );

};


export default MyAccount;