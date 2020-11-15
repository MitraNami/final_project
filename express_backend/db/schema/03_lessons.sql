DROP TABLE IF EXISTS lessons CASCADE;

CREATE TABLE lessons(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    release_date date NOT NULL,
    video_url VARCHAR(255),
    note_url VARCHAR(255),
    course_id INTEGER REFERENCES courses(id)
);