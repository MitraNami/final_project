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

//reutns true and the id of subscription if the user has an active 
//subscription otherwise false and null
const isActiveSubscriber = (subscriptions) => {
  //if there is a subscription period with null as the end_date
  //the user has an active subscription
  for (const subscription of subscriptions) {
    if (subscription.end_date === null) {
      return [true, subscription.id];
    }
  }
  return [false, null];
};

//return the lesson object with the given id
const getLessonById = (lessonId, lessons) => {
  //lessonId is a string
  return lessons.find(lesson => lesson.id === Number(lessonId));
};

//returns the subscriptions array with one of its items whose
//id is id replaced with update
const replaceSubscription = (subscriptions, update, id) => {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].id === id) {
      subscriptions.splice(i, 1, update);
      break;
    }
  }
  return subscriptions;
};



export {
  isRegisteredForACourse,
  getCourseById,
  isActiveSubscriber,
  getLessonById,
  replaceSubscription
};