DROP TABLE IF EXISTS lessons CASCADE;

CREATE TABLE lessons(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date TIMESTAMP NOT NULL,
    video_url VARCHAR(255),
    note_url VARCHAR(255),
    price INTEGER,
    course_id INTEGER REFERENCES courses(id)
);