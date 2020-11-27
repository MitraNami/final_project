import React from "react";
import User from "components/User";

export default function UserList(props) {

  const userList = props.users
    .filter(u => u.type === 'client')
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .map(u =>
      <User
        key={u.id}
        id={u.id}
        first_name={u.first_name}
        last_name={u.last_name}
        email={u.email}
      />);

  return (<>{userList.length ? userList : 'None'}</>);
};