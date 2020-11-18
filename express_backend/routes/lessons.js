const express = require('express');
const router = express.Router();

module.exports = ({
  getLessonsByCourseId
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


  return router;
};