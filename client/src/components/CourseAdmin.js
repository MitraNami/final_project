import React from "react";
import CourseList from './CourseList';
import { Link, useRouteMatch } from 'react-router-dom';

export default function CourseAdmin(props) {

  const { url } = useRouteMatch();

  return (
    <section className="courseAdmin">
      <div className="container">
        <div className="row">
          <h4>Courses</h4>
        </div>
        <CourseList courses={props.state.courses} dispatch={props.dispatch} admin={true} />
        <div className="col">
          <Link className="btn btn-primary" to={`${url}/courses/new`}>Add course</Link>
        </div>
      </div>
    </section >
  );
};
