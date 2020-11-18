import React from "react";
import CourseList from './CourseList';

export default function Courses(props) {

  return (
    <section className="courses">
      <div className="container">
        <div className="row">
          <h1>Courses</h1>
        </div>
        <CourseList courses={props.state.courses} dispatch={props.dispatch}/>
      </div>
    </section >
  );
};
