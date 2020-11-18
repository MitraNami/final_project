//the logic to show the lessons of a course in its content page is here

import { useEffect, useState } from "react";
import axios from 'axios';


const useContentData = (courseId) => {

  const [state, setState] = useState({
    lessons: []
  });

  useEffect(() => {
    axios.get(`/api/lessons/course/${courseId}`)
      .then((result) => {
        const lessons = result.data;
        console.log(lessons)
        setState(prev => ({...prev, lessons}));
      })
  }, []);


const lessons = state.lessons;

  return {
    lessons
  }
};

export default useContentData;