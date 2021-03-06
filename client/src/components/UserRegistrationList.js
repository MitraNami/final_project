import React from "react";
import UserRegistration from "components/UserRegistration";
import { getUserById, getCourseById } from "helpers/selectors"

export default function UserRegistrationList(props) {

  const registrationList = props.registrations && props.state.courses.length && props.registrations.map(registration =>
    <UserRegistration
      key={registration.id}
      user={getUserById(registration.user_id, props.state.users)}
      course={getCourseById(registration.course_id, props.state.courses)}
      registration={registration}
      updateRegistration={props.updateRegistration}
    />);

  return (<>
    {registrationList && (<>
      <div className="row">
        {!registrationList.length && <div className="col my-3">None</div>}
        {registrationList.length > 0 && (<>
          <div className="col"></div>
          <div className="col-2"><strong>Started</strong></div>
          <div className="col-2"><strong>Completed</strong></div>
          <div className="col-2"></div>
        </>)}
      </div>
      {registrationList}
    </>)}
  </>);
}
