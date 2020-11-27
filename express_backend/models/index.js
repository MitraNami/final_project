module.exports = (db, bcrypt) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password, type) => {
    //hash the password before storing them in database
    return bcrypt.hash(password, 10)
      .then(hash => {
        const query = {
          text: `INSERT INTO users (first_name, last_name, email, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING id, *`,
          values: [firstName, lastName, email, hash, type]
        }

        return db.query(query)
          .then(result => result.rows[0])
          .catch(err => console.log(err.message));
      });
  }

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
                   FROM users
                   INNER JOIN posts
                   ON users.id = posts.user_id`
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  }

  const getCourses = () => {
    const query = {
      text: 'SELECT * FROM courses',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch(err => err);
  };

  const addCourse = (c) => {
    const query = {
      text: `INSERT INTO courses (title, description, subscription_based, price, authorized)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
      values: [c.title, c.description, c.subscription_based, c.price, c.authorized]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const editCourse = (c) => {
    const query = {
      text: `UPDATE courses SET (title, description, subscription_based, price, authorized)
             = ($1, $2, $3, $4, $5)
             WHERE id = $6
             RETURNING *`,
      values: [c.title, c.description, c.subscription_based, c.price, c.authorized, c.id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const deleteCourse = (id) => {
    const query = {
      text: `DELETE FROM courses WHERE id = $1`,
      values: [id]
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getRegistrations = () => {
    const query = {
      text: 'SELECT * FROM registrations'
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addRegistration = (user_id, course_id, start_date) => {
    const query = {
      text: `INSERT INTO registrations (start_date, user_id, course_id) VALUES ($1, $2, $3) RETURNING *`,
      values: [start_date, user_id, course_id]
    };
    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const editRegistration = (r) => {
    const query = {
      text: `UPDATE registrations SET (start_date, end_date, user_id, course_id)
             = ($1, $2, $3, $4)
             WHERE id = $5
             RETURNING *`,
      values: [r.start_date, r.end_date, r.user_id, r.course_id, r.id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getLessonsByCourseId = courseId => {
    const query = {
      text: `SELECT * FROM lessons WHERE course_id = $1`,
      values: [courseId]
    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getLessonById = lessonId => {
    const query = {
      text: `SELECT * FROM lessons WHERE id = $1`,
      values: [lessonId]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const addSubscription = (userId, courseId, startDate, endDate) => {
    const query = endDate ? {
      text: `INSERT INTO subscriptions (user_id, course_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [userId, courseId, startDate, endDate]
    }
    : {
      text: `INSERT INTO subscriptions (user_id, course_id) VALUES ($1, $2) RETURNING *`,
      values: [userId, courseId]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => console.log(err.message));
  };

  const getSubscriptionsByUserIdCourseId = (userId, courseId) => {
    const query = {
      text: `SELECT * FROM subscriptions WHERE user_id = $1 AND course_id = $2`,
      values: [userId, courseId]
    }

    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => console.log(err.message));
  };

  const addLesson = (l) => {
    const query = {
      text: `INSERT INTO lessons (title, description, release_date, video_url, note_url, price, course_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
      values: [l.title, l.description, l.release_date, l.video_url, l.note_url, l.price, l.course_id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const editLesson = (l) => {
    const query = {
      text: `UPDATE lessons SET (title, description, release_date, video_url, note_url, price, course_id)
             = ($1, $2, $3, $4, $5, $6, $7)
             WHERE id = $8
             RETURNING *`,
      values: [l.title, l.description, l.release_date, l.video_url, l.note_url, l.price, l.course_id, l.id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const deleteLesson = (id) => {
    const query = {
      text: `DELETE FROM lessons WHERE id = $1`,
      values: [id]
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const deleteLessonsForCourse = (courseId) => {
    const query = {
      text: `DELETE FROM lessons WHERE course_id = $1`,
      values: [courseId]
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const endSubscription = (id) => {
    //we need to change the end_date from null to current timestamp
    const query = {
      text: `UPDATE subscriptions SET end_date = $1 WHERE id = $2 returning *`,
      values: [new Date(), id]
    };

    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
  };


  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    getCourses,
    addCourse,
    editCourse,
    deleteCourse,
    getRegistrations,
    addRegistration,
    editRegistration,
    getLessonsByCourseId,
    getLessonById,
    addSubscription,
    getSubscriptionsByUserIdCourseId,
    addLesson,
    editLesson,
    deleteLesson,
    deleteLessonsForCourse,
    endSubscription,
    bcrypt
  };
};