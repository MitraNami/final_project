import React from "react";
import Course from "../components/Course";

export default function CourseList(props) {

  const courseList = props.courses && props.courses.map(course =>
    <Course
      key={course.id}
      title={course.title}
      description={course.description}
      subscription_based={course.subscription_based}
      admin={props.admin}
    />);

  return (<>{courseList}</>);
};
