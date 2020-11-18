DROP TABLE IF EXISTS subscription CASCADE;

CREATE TABLE subscription(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id)
);