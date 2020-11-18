const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/course/:id', (req, res) => {
    //get the lessons with the given course id
    getLessons()
      .then(lessons => res.json(lessons))
      .catch((err) => res.json({
        error: err.message
      }));
  });


  return router;
};