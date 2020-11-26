import React from "react";
import User from "../components/User";

export default function UserList(props) {

  const userList = props.lessons && props.user.map(lesson =>
    <User
      key={user.id}
      id={user.id}
      first_name={lesson.first_name}
      last_name={lesson.last_name}
      email={email}
  
    />);

  return (<>{userList}</>);
};