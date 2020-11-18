//returns true if the given user if registerd for the given coure, otherwise
//returns false
const isRegisteredForACourse = (userId, courseId, registraions) => {
  for (const registraion of registraions) {
    if (registraion.user_id === userId && registraion.course_id === Number(courseId)) {
      return true;
    }
  }
  return false;
};

//return the course object with the given id
const getCourseById = (courseId, courses) => {
  //courseId is a string
  return courses.find(course => course.id === Number(courseId));
};


//returns the lessons of a given course
const getLessonsByCourseId = (courseId, allLessons) => {
  return allLessons.filter(lesson => lesson.course_id === Number(courseId));
};





export {
  isRegisteredForACourse,
  getCourseById,
  getLessonsByCourseId
};