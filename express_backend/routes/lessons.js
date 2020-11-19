const express = require('express');
const router = express.Router();

module.exports = ({
  getLessonsByCourseId,
  addLesson
}) => {

  router.get('/course/:id', (req, res) => {
    //get the lessons with the given course id
    const courseId = req.params.id;
    getLessonsByCourseId(Number(courseId))
      .then(lessons => res.json(lessons))
      .catch((err) => res.json({
        error: err.message
      }));
  });

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

  return router;
};