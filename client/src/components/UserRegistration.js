import React from "react";
import { Link } from 'react-router-dom';

export default function UserRegistration(props) {

  const startDate = props.registration.start_date && new Date(props.registration.start_date);
  const endDate = props.registration.end_date && new Date(props.registration.end_date);

  return (
    <div className="row py-1 mx-0 my-2 bg-light rounded">
      <div className="col">
        <Link to={`/admin/account/courses/${props.course.id}`}>{props.course.title}</Link>
      </div>
      <div className="col-2">
        {startDate && startDate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
      </div>
      <div className="col-2">
        {!endDate && '-'}
        {endDate && endDate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
      </div>
      <div className="col-2 text-right">
        {!props.registration.end_date && (
          <button type="submit" className="btn btn-secondary" onClick={complete}>Certify</button>
        )}
      </div>
    </div>
  );

  function complete() {
    props.updateRegistration({
      ...props.registration,
      end_date: new Date()
    });
  }
}
