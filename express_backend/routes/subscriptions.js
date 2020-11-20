const { json } = require('express');
const express = require('express');
const router = express.Router();



module.exports = ({
  addSubscription,
  getSubscriptionsByUserIdCourseId
}) => {

    /*Get subscriptions for a specific user in a specific course */
    router.get('/:userId&:courseId', (req, res) => {
      const {userId, courseId} = req.params;
      getSubscriptionsByUserIdCourseId(userId, courseId)
        .then(subsctiptions => res.json(subsctiptions))
        .catch((err) => res.json({
          error: err.message
        }));
    });

   /* subscribe a user in a course */
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