DROP TABLE IF EXISTS courses CASCADE;

CREATE TABLE courses(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subscription_based BOOLEAN,
    price integer,
    authorized boolean
);