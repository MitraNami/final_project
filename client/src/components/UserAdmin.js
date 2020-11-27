import React from "react";
import { useParams } from 'react-router-dom';
import useRegistrationData from 'hooks/useRegistrationData';
import UserRegistrationList from "components/UserRegistrationList";
import { getUserById, getRegistrationsByUserId } from "helpers/selectors"

export default function UserAdmin(props) {

  const { userId } = useParams();
  const { registrations } = useRegistrationData();
  const user = getUserById(userId, props.state.users);
  const userRegistrations = user && registrations && getRegistrationsByUserId(userId, registrations);

  return (<>
    { user &&
      <section className="userAdmin">
        <div className="container">
          <div className="row">
            <h4>User {user.first_name} {user.last_name}</h4>
          </div>
          <div className="row">
            <div className="col">
              First Name: {user.first_name}
            </div>
          </div>
          <div className="row">
            <div className="col">
              Last Name: {user.last_name}
            </div>
          </div>
          <div className="row">
            <div className="col">
              Email: {user.email}
            </div>
          </div>
          {userRegistrations && (<>
            <div className="row">
              <h5>Registered Courses</h5>
            </div>
            <UserRegistrationList state={props.state} registrations={userRegistrations} />
          </>)}
        </div>
      </section>
    }
  </>);
}
