import {useState} from 'react';

import {getUserById} from '../helpers/selectors';

const EditProfile = (props) => {

  const {userId, users} = props;
  const user = getUserById(users, userId);
  console.log(users);

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleChange = evt => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmission = () => {

  };

  return (
    <div className="container">
          <form onSubmit={handleSubmission}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className="form-control" name="firstName" id="firstName" value={state.firstName} onChange={handleChange} placeholder={user && user.first_name} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" value={state.lastName} onChange={handleChange} placeholder={user && user.last_name} required />
        </div>
        <div className="form-group">
          <label htmlFor="psssword">Password</label>
          <input type="password" className="form-control" name="password" id="password" value={state.password} onChange={handleChange} placeholder={user && user.password} required />
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
      </form>
    </div>
  );

};


export default EditProfile;