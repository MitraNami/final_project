import { useEffect, useState } from "react";
import axios from 'axios';
import { toLocalDatetime } from 'helpers/datetime';

const useLessonData = (lessonId, courseId) => {

  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    release_date: toLocalDatetime(new Date()),
    video_url: '',
    note_url: '',
    price: '0',
    course_id: courseId
  });

  useEffect(() => {
    lessonId && axios.get(`/api/lessons/${lessonId}`)
      .then((result) => setLesson(result.data));
  }, [lessonId]);

  function saveLesson() {
    if (lesson.id) {
      // Edit existing lesson
      return axios.put(`/api/lessons/${lesson.id}`, lesson)
        .then(res => setLesson(res.data));
    } else {
      // Add new lesson
      return axios.post(`/api/lessons`, lesson)
        .then(res => setLesson(res.data));
    }
  }

  return {
    lesson,
    setLesson,
    saveLesson
  }
};

export default useLessonData;