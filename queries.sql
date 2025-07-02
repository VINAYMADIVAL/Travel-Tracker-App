CREATE TABLE countries(
	id SERIAL PRIMARY KEY,
	country_code CHAR(2) UNIQUE NOT NULL,
	country_name VARCHAR(100) NOT NULL
);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (name, color)
VALUES ('You', 'teal'), ('Me', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('IT', 1), ('KR', 1), ('IT', 2), ('RU', 2 );

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;

ALTER TABLE visited_countries
			ADD UNIQUE (user_id, country_code);