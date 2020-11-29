import { useEffect, useState } from 'react';

import '../style/modal.css';
import Modal from 'react-modal';
import axios from 'axios';
import { getUserById, replaceUser } from '../helpers/selectors';
import { SET_USERS } from 'reducers/dataReducer';

const EditProfile = (props) => {

  const { userId, users, dispatch } = props;
  const user = getUserById(userId, users);

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: false,
    status: 'Submit',
    modalShow: false,
  });

  const setModalShow = show => setState(prev => ({ ...prev, modalShow: show }));

  //set up the initial values in the form once user is defined
  useEffect(() => {
    const firstName = user ? user.first_name : '';
    const lastName = user ? user.last_name : '';
    const email = user ? user.email : '';
    setState(prev => ({ ...prev, firstName, lastName, email }));

  }, [user]);

  const setError = errStatus => setState(prev => ({ ...prev, error: errStatus }));

  const handleChange = evt => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  //if the two passwords don't match returns false and diaplays an error to the user
  const checkEqualPasswords = () => {
    setError(false);
    if (state.password === state.confirmPassword) {
      return true;
    }
    setError(true);
    return false;
  };

  const handleSubmission = evt => {
    evt.preventDefault();
    setState(prev => ({ ...prev, status: 'Sending' }));
    if (checkEqualPasswords()) { //in case the user submits while still in the last field
      axios.put('/api/users', {
        id: userId,
        first_name: state.firstName,
        last_name: state.lastName,
        password: state.password,
      })
        .then(result => {
          //update the users state
          const updatedUser = result.data;
          const updatedUsers = replaceUser([...users], updatedUser, userId);
          dispatch({ type: SET_USERS, users: updatedUsers });
          setModalShow(true)
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container">
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
          <input type="email" className="form-control" name="email" id="email" value={state.email} onChange={handleChange} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="psssword">New Password</label>
          <input type="password" className="form-control" name="password" id="password" value={state.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" >Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={state.confirmPassword}
            onChange={handleChange} onBlur={checkEqualPasswords} />
          {/*passwords don't match*/}
          {state.error &&
            <small className="text-danger ">
              *passwords don't match
            </small>}
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">{state.status}</button>
      </form>

      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={state.modalShow}
      >
        <div className="d-flex flex-column justify-content-center">
          <p className="text-center">
            Profile Updated
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-dark" onClick={() => {
              setModalShow(false)
              setState(prev => ({ ...prev, status: 'Submit' }));
            }}>OK</button>
          </div>
        </div>
      </Modal>
    </div>
  );

};


export default EditProfile;