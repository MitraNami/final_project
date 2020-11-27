const express = require('express');
const router = express.Router();

module.exports = ({
  getLessonsByCourseId,
  getLessonById,
  addLesson,
  editLesson,
  deleteLesson
}) => {

  router.post('/', (req, res) => {
    const lesson = {
      title,
      description,
      release_date,
      video_url,
      note_url,
      price,
      course_id
    } = req.body;

    addLesson(lesson)
      .then(newLesson => res.json(newLesson))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.get('/:id', (req, res) => {
    getLessonById(Number(req.params.id))
      .then(lesson => res.json(lesson))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.put('/:id', (req, res) => {
    const lesson = { ...req.body, id: req.params.id };

    editLesson(lesson)
      .then(updatedLesson => res.json(updatedLesson))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.delete('/:id', (req, res) => {
    deleteLesson(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.get('/course/:id', (req, res) => {
    //get the lessons with the given course id
    const courseId = req.params.id;
    getLessonsByCourseId(Number(courseId))
      .then(lessons => res.json(lessons))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};