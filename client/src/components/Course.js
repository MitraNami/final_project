import axios from "axios";
import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import { DELETE_COURSE } from '../reducers/dataReducer';

export default function Course(props) {

  const { url } = useRouteMatch();

  return (
    <div className="row">
      <div className="col">
        {props.title} {props.subscription_based ? '(subscription)' : ''}
      </div>
      { props.admin && (<div className="col-1"><Link className="btn btn-primary" to={`${url}/courses/${props.id}`}>Edit</Link></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary" onClick={delCourse}>Delete</button></div>)}
    </div>
  );

  function delCourse() {
    return axios.delete(`/api/courses/${props.id}`)
      .then(() => props.dispatch({ type: DELETE_COURSE, id: props.id }));
  }
}
