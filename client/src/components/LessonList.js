import React, { useState } from "react";
import Lesson from "../components/Lesson";

export default function LessonList(props) {

  const lessonList = props.lessons && props.lessons.map(lesson =>
    <Lesson
      key={lesson.id}
      title={lesson.title}
      content={lesson.content}
      release_date={lesson.release_date}
      video_url={lesson.note_url}
      course_url={lesson.course_id}
      admin={props.admin}
    />);

  return (<>{lessonList}</>);
};