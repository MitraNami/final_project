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

//reutns true if the user has an active subscription otherwise false
const isActiveSubscriber = (subscriptions) => {
  //if there is a subscription period with null as the end_date
  //the user has an active subscription
  for (const subscription of subscriptions) {
    if (subscription.end_date === null) {
      return true;
    }
  }
  return false;
};

export {
  isRegisteredForACourse,
  getCourseById,
  isActiveSubscriber
};