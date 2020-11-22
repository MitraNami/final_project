DROP TABLE IF EXISTS registrations CASCADE;

CREATE TABLE registrations(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id)
);