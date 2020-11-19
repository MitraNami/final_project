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

//return the lesson object with the given id
const getLessonById = (lessonId, lessons) => {
  //lessonId is a string
  return lessons.find(lesson => lesson.id === Number(lessonId));
};




export {
  isRegisteredForACourse,
  getCourseById,
  getLessonById
};