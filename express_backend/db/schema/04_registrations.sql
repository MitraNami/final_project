DROP TABLE IF EXISTS registrations CASCADE;

CREATE TABLE registrations(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id)
);