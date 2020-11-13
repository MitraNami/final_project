import React, { useState } from 'react';
import axios from 'axios';
import { SET_TOKEN } from './reducers/dataReducer';


const Login = (props) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleSubmission = (evt) => {
    evt.preventDefault();

    axios.post('/api/users/login', {
      email: state.email,
      password: state.password
    })
      .then(result => {
      if(result.data.accessToken) {
        //successful login
  
        localStorage.setItem('token', JSON.stringify(result.data));
        props.dispatch({type: SET_TOKEN, token: result.data});
        
      } else {
        console.log("wrong email or pass")
      }
      
      }) 
    };

  const handleChange = (evt) => {
    setState({...state, [evt.target.name] : evt.target.value});
  };

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={state.email} onChange={handleChange}/>
        <label htmlFor="psssword">Password</label>
        <input type="password" name="password" id="password" value={state.password} onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>

  );
}


export default Login;