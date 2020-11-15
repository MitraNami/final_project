

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from './hooks/useApplicationData';

import AdminCourse from './components/AdminCourse';
import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';


function App() {

  const { state, dispatch } = useApplicationData();

  return (
    <div>
      <Router>
        <Navbar state={state} dispatch={dispatch} />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login dispatch={dispatch} />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/admin/account'>
            <AdminCourse state={state} dispatch={dispatch} />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
