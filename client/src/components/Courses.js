import React from "react";
import CourseList from './CourseList';

export default function CourseAdmin(props) {

  return (
    <section className="courseAdmin">
      <div className="container">
        <div className="row">
          <h1>Courses</h1>
        </div>
        <CourseList courses={props.state.courses} dispatch={props.dispatch}/>
      </div>
    </section >
  );
};
