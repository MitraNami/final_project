//the logic to show the lessons of a course in its content page is here

import { useEffect, useState } from "react";
import axios from 'axios';
import {getLessonsByCourseId} from '../helpers/selectors';


const useContentData = (courseId) => {

  const [state, setState] = useState({
    lessons: []
  });

  // useEffect(() => {
  //   axios.get('/api/lessons')
  //     .then((result) => {
  //       const allLessons = result.data;
  //        const lessons = getLessonsByCourseId(courseId, allLessons);
  //       setState(prev => ({...prev, lessons}));
  //     })
  // }, []);


const lessons = state.lessons;

  return {
    lessons
  }
};

export default useContentData;