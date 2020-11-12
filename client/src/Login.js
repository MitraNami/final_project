import React, { useState } from 'react';
import axios from 'axios';


const Login = (props) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleSubmission = (evt) => {
    evt.preventDefault();
    //console.log(state.email, state.password);

    axios.post('/users/login', {
      email: state.email,
      password: state.password
    })
      .then(result => {
      if(!result.data.msg) {
        //successful login, result.data obj contains accessToken
        console.log(result.data)
        props.dispatch({type: "SET_ATHURIZATION", isAuth: true})
        localStorage.setItem('token', result.data.accessToken)
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
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value={state.email} onChange={handleChange}/>
        <label for="psssword">Password</label>
        <input type="password" name="password" id="password" value={state.password} onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>

  );
}


export default Login