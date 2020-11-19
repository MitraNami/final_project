const express = require('express');
const router = express.Router();



module.exports = ({
  addSubscription
}) => {

   /* GET users listing. */
   router.post('/', (req, res) => {
    
    const {
      user_id,
      course_id
    } = req.body;

    addSubscription(user_id, course_id)
      .then(newSubscription => {
        res.json(newSubscription);
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });









  return router;

};