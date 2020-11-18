import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';

export default function Course(props) {

  const { url } = useRouteMatch();

  return (
    <div className="row">
      <div className="col">
        {props.title}
      </div>
      { props.admin && (<div className="col-1"><Link className="btn btn-primary" to={`${url}/courses/lessons/${props.id}`}>Edit</Link></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary" onClick={delCourse}>Delete</button></div>)}
    </div>
  );

  function delCourse() {
 
  }
}
