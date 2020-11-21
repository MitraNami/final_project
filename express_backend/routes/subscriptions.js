const { json } = require('express');
const express = require('express');
const router = express.Router();



module.exports = ({
  addSubscription,
  getSubscriptionsByUserIdCourseId,
  endSubscription
}) => {

    /*Get subscriptions for a specific user in a specific course */
    router.get('/:userId&:courseId', (req, res) => {
      const {userId, courseId} = req.params;
      getSubscriptionsByUserIdCourseId(Number(userId), Number(courseId))
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

  /*End the subscription for a given subscription id */
  router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    endSubscription(id)
      .then(updatedSubsctiption => res.json(updatedSubsctiption))
      .catch((err) => res.json({
        error: err.message
      }));
  });



  return router;

};