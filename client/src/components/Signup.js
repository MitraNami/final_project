import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import { SET_TOKEN } from '../reducers/dataReducer';

const Signup = (props) => {

  const history = useHistory();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: false,
    saving: false
  });

  const handleSubmission = (evt) => {
    evt.preventDefault();
    setState(prev => ({ ...prev, saving: true }));
    axios.post('/api/users', {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      password: state.password,
      type: 'client'
    })
      .then(result => {
        if (result.data.msg === 'Sorry, a user account with this email already exists') {
          setState(prev => ({ ...prev, error: true, saving: false }));
          //console.log('user with this email exists')
        } else {
          //login with this info'
          localStorage.setItem('token', JSON.stringify(result.data));
          history.goBack(); //redirect to the previous page
          props.dispatch({ type: SET_TOKEN, token: result.data });
        }
      })
      .catch(err => console.log(err))

  };


  const handleChange = (evt) => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <div className="container p-5">
      <form onSubmit={handleSubmission}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className="form-control" name="firstName" id="firstName" value={state.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" value={state.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" value={state.email} onChange={handleChange} required />
          {/*wrong email or password error msg*/}
          {state.error &&
            <small id="authentication" className="text-danger ">
              *email exists
            </small>}

        </div>
        <div className="form-group">
          <label htmlFor="psssword">Password</label>
          <input type="password" className="form-control" name="password" id="password" value={state.password} onChange={handleChange} required />
        </div>
        {!state.saving && <button type="submit" className="btn btn-primary btn-lg btn-block">Signup</button>}
        {state.saving && <span>saving...</span>}
        <br />
        <p>Already a member? <Link to='/login'>Login</Link></p>
      </form>
    </div>

  );
}


export default Signup;