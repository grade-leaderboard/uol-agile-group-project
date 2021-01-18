-- Create and use database
CREATE DATABASE IF NOT EXISTS grades_leaderboard;
USE grades_leaderboard;

-- Drop tables and views
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS courses;
DROP VIEW IF EXISTS modules_with_grades;

-- Create Tables
CREATE TABLE `courses` (
	`id` VARCHAR(6),
	`title` VARCHAR(100),
	PRIMARY KEY (`id`)
);
CREATE TABLE `grades` (
	`id` int NOT NULL AUTO_INCREMENT,
	`course_id` VARCHAR(6),
	`grade` SMALLINT,
	PRIMARY KEY (`id`),
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
	grades(course_id, grade)
VALUES
	('CM1005', 100),
	('CM1005', 90),
	('CM1005', 92),
	('CM1005', 80),
	('CM1005', 63),
	('CM1010', 88),
	('CM1010', 99),
	('CM1010', 92),
	('CM1010', 40),
	('CM1010', 65),
	('CM1015', 84),
	('CM1015', 91),
	('CM1015', 96),
	('CM1015', 70),
	('CM1015', 62);