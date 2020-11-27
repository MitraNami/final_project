const express = require('express');
const router = express.Router();
const { getPostsByUsers } = require('../helpers/dataHelpers');
const jwt = require('jsonwebtoken');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts,
  getRegistrations,
  addRegistration,
  editRegistration,
  bcrypt
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/posts', (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);

      })
      .catch((err) => res.json({
        error: err.message
      }));
  });



  router.get('/registrations', (req, res) => {
    getRegistrations()
      .then(registrations => {
        res.json(registrations);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });




  router.post('/', (req, res) => {

    const {
      first_name,
      last_name,
      email,
      password,
      type
    } = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        } else {
          addUser(first_name, last_name, email, password, type)
            .then(newUser => {
              //res.json(newUser)
              const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
              res.json({ accessToken, userType: newUser.type, email: newUser.email, userId: newUser.id });
            })
            .catch(err => console.log(`Error: ${err.message}`))
        }

      })

  });

  router.post('/login', (req, res) => {

    const { email, password } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (user) {
          //check password
          bcrypt.compare(password, user.password)
            .then(authenticated => {
              if (authenticated) {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.json({ accessToken, userType: user.type, userId: user.id, email: user.email });

              } else {
                res.json({ msg: "wrong passwrord" })
              }
            })

        } else {
          res.json({ msg: 'Sorry, email does not exist' })
        }
      })
      .catch(err => res.json({
        error: err.message
      }));

  });

  router.post('/registrations', (req, res) => {
    const { start_date, user_id, course_id } = req.body;
    addRegistration(user_id, course_id, start_date)
      .then(newRegistration => res.json(newRegistration))
      .catch(err => console.log(`Error: ${err.message}`))

  });

  router.put('/registrations/:id', (req, res) => {
    const registration = {
      id: req.params.id,
      start_date,
      user_id,
      course_id
    } = req.body;

    editRegistration(registration)
      .then(updatedRegistration => res.json(updatedRegistration))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};