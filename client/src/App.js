import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import useApplicationData from './hooks/useApplicationData';


import {useReducer, useEffect} from 'react';
import Navbar from './NavBar';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';


const SET_ATHURIZATION = "SET_ATHURIZATION";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_ATHURIZATION: {
      const {isAuth} = action;
      return {...state, isAuth};
    }
    default: 
      return state;

  }
}

function App() {

  // const {state, dispatch} = useApplicationData();
  // const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
  // ));
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({type: SET_ATHURIZATION, isAuth: true})
    } 
  } , []);


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
