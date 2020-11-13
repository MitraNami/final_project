import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from './hooks/useApplicationData';
import CourseList from './components/CourseList';

import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';


function App() {

  const { state, dispatch } = useApplicationData();

  return (
    <div>
      <Router>
        <CourseList courses={state.courses} dispatch={dispatch} adding={state.addingCourse} />
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
        </Switch>

      </Router>
    </div>
  );
}



export default App;
