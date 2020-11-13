import React, { useState } from 'react';
import axios from 'axios';


const Signup = () => {

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmission = (evt) => {
    evt.preventDefault();
    //console.log(state.firstName, state.lastName, state.email, state.password);

    axios.post('/api/users', {
      first_name: state.firstName, 
      last_name: state.lastName, 
      email: state.email, 
      password: state.password,
      type: 'client'})
      .then(result => {
        if (result.data.msg === 'Sorry, a user account with this email already exists'){
          console.log('user with this email exists')
        } else {
          console.log(result)
          console.log('login with this info')
        }
      })
      .catch(/*error didn't go through suscessfully  */)

  };


  const handleChange = (evt) => {
    setState({...state, [evt.target.name] : evt.target.value});
  };

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" value={state.firstName} onChange={handleChange}/>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" value={state.lastName} onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={state.email} onChange={handleChange}/>
        <label htmlFor="psssword">Password</label>
        <input type="password" name="password" id="password" value={state.password} onChange={handleChange}/>
        <button type="submit">Signup</button>
      </form>
    </div>

  );
}


export default Signup;