import React from "react";
import { ADD_COURSE } from "../reducers/dataReducer";
import Course from "../components/Course";
import NewCourse from "./NewCourse";

export default function CourseList(props) {

  const courseList = props.courses && props.courses.map(course =>
    <Course
      key={course.id}
      title={course.title}
      description={course.description}
      subscription_based={course.subscription_based}
    />);

  return (
    <section className="courses">
      <h1>Courses</h1>
      <ul>{courseList}</ul>
      { !props.adding && (<button onClick={addCourse}>Add course</button>)}
      { props.adding && (<NewCourse dispatch={props.dispatch} />)}
    </section>
  );

  function addCourse() {
    props.dispatch({ type: ADD_COURSE, course: {}});
  }
};
