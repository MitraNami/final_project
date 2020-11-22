DROP TABLE IF EXISTS subscriptions CASCADE;

CREATE TABLE subscriptions(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ DEFAULT NULL,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id)
);