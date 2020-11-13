import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from './hooks/useApplicationData';

import Navbar from './NavBar';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';


function App() {

  const {state, dispatch} = useApplicationData();
  // const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
  // ));
 

  return (
    <div>
      {/* <h1> Users </h1>
      <ul> {userList} </ul> */}
    <Router>
      
        <Navbar state={state} dispatch={dispatch}/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login dispatch={dispatch}/>
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
