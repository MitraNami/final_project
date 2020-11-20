import React from "react";
import Lesson from "../components/Lesson";

export default function LessonList(props) {

  const lessonList = props.lessons && props.lessons.map(lesson =>
    <Lesson
      key={lesson.id}
      id={lesson.id}
      title={lesson.title}
      description={lesson.description}
      release_date={lesson.release_date}
      video_url={lesson.video_url}
      note_url={lesson.note_url}
      price={lesson.price}
      course_id={lesson.course_id}
      admin={props.admin}
      deleteLesson={props.deleteLesson}
    />);

  return (<>{lessonList}</>);
};