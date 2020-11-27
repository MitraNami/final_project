

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from 'hooks/useApplicationData';

import Admin from 'components/Admin';
import Navbar from 'components/NavBar';
import Signup from 'components/Signup';
import Login from 'components/Login';
import Home from 'components/Home';
import CoursesPage from 'components/CoursesPage';
import CourseHomePage from 'components/CourseHomePage';
import CoursePage from 'components/CoursePage'
import CourseEdit from 'components/CourseEdit';
import LessonEdit from 'components/LessonEdit';
import MyAccount from 'components/MyAccount';
import Contact from 'components/Contact';
import Footer from 'components/Footer';
import UserAdmin from 'components/UserAdmin';

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
          <Route exact path='/contact'>
            <Contact />
          </Route>
          <Route exact path='/courses'>
            <CoursesPage courses={state.courses} />
          </Route>
          <Route exact path='/courses/:courseId/home'>
            <CourseHomePage state={state} />
          </Route>
          <Route exact path='/courses/:courseId/content'> {/*make it a private route*/}
            <CoursePage state={state} />
          </Route>
          <Route path='/login'>
            <Login dispatch={dispatch} />
          </Route>
          <Route path='/signup'>
            <Signup dispatch={dispatch} />
          </Route>
          <Route path='/users/account'> {/*make it a private route*/}
            <MyAccount state={state} />
          </Route>
          <Route exact path='/admin/account'> {/*make it a private route*/}
            <Admin state={state} dispatch={dispatch} />
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
          <Route exact path='/admin/account/users/:userId'> {/*make it a private route*/}
            <UserAdmin state={state} />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
