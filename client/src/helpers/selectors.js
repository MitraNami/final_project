//returns true if the given user if registerd for the given coure, otherwise
//returns false
const isRegisteredForACourse = (userId, courseId, registraions) => {
  for (const registraion of registraions) {
    if (registraion.user_id === userId && registraions.course_id === courseId) {
      return true;
    }
  }
  return false;
};




export {isRegisteredForACourse};