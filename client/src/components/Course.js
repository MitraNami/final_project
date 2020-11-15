import React from "react";

export default function Course(props) {
  return (
    <div className="row">
      <div className="col">
        {props.title} {props.subscription_based ? '(subscription)' : ''}
      </div>
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary">Edit</button></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary">Delete</button></div>)}
    </div>
  );
}
