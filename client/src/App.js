

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from './hooks/useApplicationData';

import CourseAdmin from './components/CourseAdmin';
import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CoursesPage from './components/CoursesPage';
import CourseHomePage from './components/CourseHomePage';
//import Courses from './components/Courses'; //we both did /courses route


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
          <Route exact path='/courses'>
            <CoursesPage courses={state.courses} />
          </Route>
          <Route exact path='/courses/:courseId/home'>
            <CourseHomePage state={state}/>
          </Route>
          <Route path='/login'>
            <Login dispatch={dispatch} />
          </Route>
          <Route path='/signup'>
            <Signup dispatch={dispatch} />
          </Route>
          <Route path='/admin/account'>
            <CourseAdmin state={state} dispatch={dispatch} />
          </Route>
          {/* <Route path='/courses'>
            <Courses state={state} dispatch={dispatch} />
          </Route> */}
        </Switch>

      </Router>
    </div>
  );
}

export default App;
