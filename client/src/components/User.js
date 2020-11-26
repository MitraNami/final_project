import React from "react";

export default function User(props) {

  return (
    <div className="row">
      <div className="col">
        {props.first_name}
        {props.last_name}
        {props.email}
      </div>
    </div>
  );
}
