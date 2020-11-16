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
  }

  const addUser = (firstName, lastName, email, password, type) => {
    //hash the password before storing them in database
    return bcrypt.hash(password, 10)
      .then(hash => {
        const query = {
          text: `INSERT INTO users (first_name, last_name, email, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
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

  const addCourse = (title, content, subscription_based, price, authorized) => {
    const query = {
      text: `INSERT INTO courses (title, content, subscription_based, price, authorized) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [title, content, subscription_based, price, authorized]
    }

    return db.query(query)
      .then(result => result.rows[0])
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

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    getCourses,
    addCourse,
    getRegistrations,
    addRegistration,
    bcrypt
  };
};