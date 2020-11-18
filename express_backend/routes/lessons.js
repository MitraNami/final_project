const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    getLessons()
      .then(lessons => res.json(lessons))
      .catch((err) => res.json({
        error: err.message
      }));
  });


  return router;
};