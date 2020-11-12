DROP TABLE IF EXISTS invoices CASCADE;

CREATE TABLE invoices(
    id SERIAL PRIMARY KEY NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    registration_id INTEGER REFERENCES registrations(id)
);