import React from "react";
import UserRegistration from "components/UserRegistration";
import { getUserById, getCourseById } from "helpers/selectors"

export default function UserRegistrationList(props) {

  const registrationList = props.registrations && props.state.courses.length && props.registrations.map(registration =>
    <UserRegistration
      key={registration.id}
      user={getUserById(registration.user_id, props.state.users)}
      course={getCourseById(registration.course_id, props.state.courses)}
    />);

  return (<>{registrationList && (registrationList.length ? registrationList : 'None')}</>);
};