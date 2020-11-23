import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { SET_TOKEN } from '../reducers/dataReducer';


const Login = (props) => {

  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
    error: false,
    loading: false
  });

  const handleSubmission = (evt) => {
    evt.preventDefault();
    setState(prev => ({ ...prev, loading: true }));

    axios.post('/api/users/login', {
      email: state.email,
      password: state.password
    })
      .then(result => {
        if (result.data.accessToken) {
          //successful login

          localStorage.setItem('token', JSON.stringify(result.data));
          history.goBack(); //redirect to the previous page
          props.dispatch({ type: SET_TOKEN, token: result.data });

        } else {
          setState(prev => ({ ...prev, error: true, loading: false }));
        }

      })
  };

  const handleChange = (evt) => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <div className="d-flex flex-row justify-content-around mt-5">
      <img className="align-self-center p-2" src="https://cdn.pixabay.com/photo/2016/06/04/00/40/yoga-1434787_960_720.jpg" />
      <div className="d-flex flex-column align-self-center flex-grow-1 p-5">
        <form onSubmit={handleSubmission}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={state.email} onChange={handleChange} required />
            <br />
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="psssword">Password</label>
            <input type="password" className="form-control" name="password" id="password" value={state.password} onChange={handleChange} required/>
            <br />
            {/*wrong email or password error msg*/}
            {state.error &&
              <small id="authentication" className="text-danger ">
                *invalid email or password
              </small>}

          </div>
          {!state.loading && <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>}
          {state.loading && <span>loading...</span>}
        </form>
        <br />
        <p>Not a member? <Link to='/signup'>Sign up</Link></p>
      </div>
    </div>

  );
}


export default Login;