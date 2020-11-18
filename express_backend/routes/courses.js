const express = require('express');
const router = express.Router();

module.exports = ({
  getCourses,
  addCourse
}) => {
  router.get('/', (req, res) => {
    getCourses()
      .then((courses) => res.json(courses))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {
    const course = {
      title,
      description,
      subscription_based,
      price,
      authorized
    } = req.body;

    addCourse(course.title, course.description, course.subscription_based, course.price, course.authorized)
      .then(newCourse => res.json(newCourse))
      .catch(err => res.json({
        error: err.message
      }));
  });

  return router;
};