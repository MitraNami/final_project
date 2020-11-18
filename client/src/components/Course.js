import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';

export default function Course(props) {

  const { url } = useRouteMatch();

  return (
    <div className="row">
      <div className="col">
        {props.title} {props.subscription_based ? '(subscription)' : ''}
      </div>
      { props.admin && (<div className="col-1"><Link className="btn btn-primary" to={`${url}/courses/${props.id}`}>Edit</Link></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary" onClick={deleteCourse}>Delete</button></div>)}
    </div>
  );

  function deleteCourse() {

  }
}
