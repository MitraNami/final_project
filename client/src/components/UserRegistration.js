import React from "react";
import { Link } from 'react-router-dom';

export default function UserRegistration(props) {

  const startDate = props.registration.start_date && new Date(props.registration.start_date);
  const endDate = props.registration.end_date && new Date(props.registration.end_date);

  return (
    <div className="row">
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
      <div className="col-1">
        {!props.registration.end_date && (
          <div className="col-1">
            <button type="submit" className="btn btn-primary" onClick={complete}>Certify</button>
          </div>
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
