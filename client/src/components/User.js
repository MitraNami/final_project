import React from "react";
import { Link } from 'react-router-dom';

export default function User(props) {

  return (
    <div className="row">
      <div className="col">
        <Link to={`/admin/account/users/${props.id}`}>{props.first_name} {props.last_name}</Link> ({props.email})
      </div>
    </div>
  );
}
