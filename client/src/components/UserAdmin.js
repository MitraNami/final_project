import React from "react";
import { useParams } from 'react-router-dom';
import useRegistrationData from 'hooks/useRegistrationData';
import UserRegistrationList from "components/UserRegistrationList";
import { getUserById, getRegistrationsByUserId } from "helpers/selectors"
import { Link, useRouteMatch } from 'react-router-dom';

export default function UserAdmin(props) {

  const { userId } = useParams();
  const { registrations, updateRegistration } = useRegistrationData();
  const user = getUserById(userId, props.state.users);
  const userRegistrations = user && registrations && getRegistrationsByUserId(userId, registrations);
  const { url } = useRouteMatch();

  return (<>
    { user &&
      <div className="container">
        <h4>User Account</h4>
        <section className="border border-dark p-3 my-3">
          <h5>Account Information</h5>
          <form>
            <div className="form-group row mb-0">
              <label htmlFor="first_name" className="col-2 col-form-label">First name:</label>
              <div className="col">
                <input className="form-control-plaintext"
                  type="text"
                  id="first_name"
                  value={user.first_name}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row mb-0">
              <label htmlFor="last_name" className="col-2 col-form-label">Last name:</label>
              <div className="col">
                <input className="form-control-plaintext"
                  type="text"
                  id="last_name"
                  value={user.last_name}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-2 col-form-label">Email:</label>
              <div className="col">
                <input className="form-control-plaintext"
                  type="text"
                  id="email"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>
          </form>
        </section>
        {userRegistrations && (<>
          <section className="border border-dark p-3 my-3">
            <h5>Course Registrations</h5>
            <UserRegistrationList state={props.state} registrations={userRegistrations} updateRegistration={updateRegistration} />
            <Link className="btn btn-secondary mr-2" to={`${url}/register`}>Add Registration</Link>
          </section>
        </>)}
      </div>
    }
  </>);
}
