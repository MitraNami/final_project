

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from './hooks/useApplicationData';

import CourseAdmin from './components/CourseAdmin';
import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CoursesPage from './components/CoursesPage';
import CourseHomePage from './components/CourseHomePage';
import CoursePage from './components/CoursePage'
import CourseEdit from 'components/CourseEdit';
import LessonEdit from 'components/LessonEdit';

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
          <Route exact path='/courses/:courseId/content'> {/*make it a private route*/}
            <CoursePage state={state}/>
          </Route>
          <Route path='/login'>
            <Login dispatch={dispatch} />
          </Route>
          <Route path='/signup'>
            <Signup dispatch={dispatch} />
          </Route>
          <Route exact path='/admin/account'> {/*make it a private route*/}
            <CourseAdmin state={state} dispatch={dispatch} />
          </Route>
          <Route exact path='/admin/account/courses/new'> {/*make it a private route*/}
            <CourseEdit state={state} dispatch={dispatch} />
          </Route>
          <Route exact path='/admin/account/courses/:courseId'> {/*make it a private route*/}
            <CourseEdit state={state} dispatch={dispatch} />
          </Route>
          <Route exact path='/admin/account/courses/:courseId/lesson/new'> {/*make it a private route*/}
            <LessonEdit />
          </Route>
          <Route exact path='/admin/account/courses/:courseId/lesson/:lessonId'> {/*make it a private route*/}
            <LessonEdit />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
