DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS users;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE users (
  user_id serial,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  admin boolean NOT NULL 
);
