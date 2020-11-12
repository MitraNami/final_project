import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import useApplicationData from './hooks/useApplicationData';
import './App.css';

import Signup from './Signup';
import Login from './Login';

function App() {

  // const {state, dispatch} = useApplicationData();
  // const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
  // ));


  return (
    <div className="App">
      {/* <h1> Users </h1>
      <ul> {userList} </ul> */}

      <Signup />
      <Login />
    </div>
  );
}

export default App;
