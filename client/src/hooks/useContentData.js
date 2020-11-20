//the logic to show the lessons of a course in its content page is here

import { useEffect, useState } from "react";
import axios from 'axios';

const useContentData = (courseId) => {

  const [state, setState] = useState({
    lessons: []
  });

  useEffect(() => {
    courseId && axios.get(`/api/lessons/course/${courseId}`)
      .then((result) => {
        const lessons = result.data;
        setState(prev => ({ ...prev, lessons }));
      })
  }, []);

  const lessons = state.lessons;

  function deleteLesson(lessonId) {
    return axios.delete(`/api/lessons/${lessonId}`)
      .then(() => setState(prev => ({
        ...prev,
        lessons: lessons.filter(l => l.id !== lessonId)
      })));
  }

  return {
    lessons,
    deleteLesson
  }
};

export default useContentData;