import React from "react";
import CourseList from '../components/CourseList';

export default function AdminCourse(props) {

  return (
    <section className="adminCourses">
      <CourseList courses={props.state.courses} dispatch={props.dispatch} adding={props.state.addingCourse} />
    </section>
  );
};
