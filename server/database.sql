CREATE DATABASE perntodo;

CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  is_crossed_out BOOLEAN DEFAULT FALSE,
  date DATEDEFAULT CURRENT_DATE,
);

-- psql -U postgres