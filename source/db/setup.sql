-- Create and use database
CREATE DATABASE IF NOT EXISTS grades_leaderboard;
USE grades_leaderboard;

-- Drop tables and views
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP VIEW IF EXISTS modules_with_grades;

-- Create Tables
CREATE TABLE `courses` (
	`id` VARCHAR(6),
	`title` VARCHAR(100),
	PRIMARY KEY (`id`)
);
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(80) NOT NULL,
    `email` VARCHAR(80),
    `slackuid` VARCHAR(25) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);
CREATE TABLE `sessions` (
	`id` int NOT NULL AUTO_INCREMENT,
	`session` VARCHAR(50),
	PRIMARY KEY (`id`)
);
CREATE TABLE `grades` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int,
	`session_id` int,
	`course_id` VARCHAR(6),
	`grade` SMALLINT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES users(id),
    	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create Views
CREATE VIEW modules_with_grades AS
SELECT
	c.id,
	c.title,
	FLOOR(RAND() * 100) as grade
FROM
	courses c;

-- Insert into Tables
INSERT INTO
	courses(id, title)
VALUES
	('CM1005', 'Introduction to Programming I'),
	('CM1010', 'Introduction to Programming II'),
	('CM1015', 'Numerical Mathematics'),
	('CM1020', 'Discrete Mathematics'),
	('CM1025', 'Fundamentals of Computer Science'),
	('CM1030', 'How Computers Work'),
	('CM1035', 'Algorithms and Data Structures I'),
	('CM1040', 'Web Development'),
	('CM2005', 'Object Oriented Programming'),
	('CM2010', 'Software Design and Development'),
	('CM2015', 'Programming with Data'),
	('CM2020', 'Agile Software Projects'),
	('CM2025', 'Computer Security'),
	('CM2030', 'Graphics Programming'),
	('CM2035', 'Algorithms and Data Structures II'),
	('CM2040', 'Databases, Networks and the Web'),
	('CM3005', 'Data Science'),
	(
		'CM3010',
		'Databases and Advanced Data Techniques'
	),
	('CM3015', 'Machine Learning and Neural Networks'),
	('CM3020', 'Artificial Intelligence'),
	('CM3025', 'Virtual Reality'),
	('CM3030', 'Games Development'),
	('CM3035', 'Advanced Web Development'),
	(
		'CM3040',
		'Physical Computing and Internet of Things'
	),
	('CM3045', '3D Graphics and Animation'),
	('CM3050', 'Mobile Development'),
	('CM3055', 'Interaction Design'),
	('CM3060', 'Natural Language Processing'),
	('CM3070', 'Final Project');

INSERT INTO
	sessions(session)
VALUES
	('April 2019'),
	('October 2019'),
	('April 2020'),
	('October 2020'),
	('April 2021'),
	('October 2021'),
	('April 2022'),
	('October 2022');

INSERT INTO
	users(username, email, slackuid)
VALUES
	('Alex', 'alex@something.com', '1'),
	('Arjun', 'arjun@something.com', '2'),
	('Blair', 'blair@something.com', '3'),
	('Hayato', 'hayato@something.com', '4');

INSERT INTO
	grades(user_id, session_id, course_id, grade)
VALUES
	(1, 1, 'CM1005', 100),
	(2, 1, 'CM1005', 90),
	(3, 1, 'CM1005', 92),
	(4, 1, 'CM1005', 80),
	(2, 1, 'CM1010', 88),
	(3, 1, 'CM1010', 99),
	(4, 1, 'CM1010', 92),
	(1, 1, 'CM1010', 40),
	(3, 1, 'CM1015', 84),
	(4, 2, 'CM1015', 91),
	(1, 3, 'CM1015', 96),
	(2, 4, 'CM1015', 70),
	(4, 4, 'CM1020', 99),
	(1, 3, 'CM1020', 80),
	(2, 2, 'CM1020', 49),
	(3, 1, 'CM1020', 40);