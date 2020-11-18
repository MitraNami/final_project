const express = require('express');
const router = express.Router();

module.exports = ({
  getCourses,
  addCourse,
  editCourse,
  deleteCourse
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

    addCourse(course)
      .then(newCourse => res.json(newCourse))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.put('/:id', (req, res) => {
    const course = {
      id: req.params.id,
      title,
      description,
      subscription_based,
      price,
      authorized
    } = req.body;

    editCourse(course)
      .then(editedCourse => res.json(editedCourse))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.delete('/:id', (req, res) => {
    deleteCourse(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json({
        error: err.message
      }));
  });

  return router;
};