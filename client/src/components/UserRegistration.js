import React from "react";
import { Link } from 'react-router-dom';

export default function UserRegistration(props) {

  return (
    <div className="row">
      <div className="col">
        <Link to={`/admin/account/courses/${props.course.id}`}>{props.course.title}</Link>
      </div>
    </div>
  );
}
