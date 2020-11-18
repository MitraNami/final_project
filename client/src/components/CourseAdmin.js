import React, { useState } from "react";
import CourseList from './CourseList';
import { Link, useRouteMatch } from 'react-router-dom';
// import NewCourse from "./NewCourse";

export default function CourseAdmin(props) {

  // const [adding, setAdding] = useState(false);
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
        {/* <div className="row">
          {!adding && (
            <div className="col">
              <button type="submit" className="btn btn-primary" onClick={() => setAdding(true)}>Add course</button>
            </div>
          )}
          {adding && (
            <div className="col">
              <NewCourse dispatch={props.dispatch} onClose={() => setAdding(false)} />
            </div>
          )}
        </div> */}
      </div>
    </section >
  );
};
