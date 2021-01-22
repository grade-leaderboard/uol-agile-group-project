CREATE DATABASE IF NOT EXISTS grades_leaderboard;

USE grades_leaderboard;

DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS study_sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP VIEW IF EXISTS modules_with_grades;

CREATE TABLE `courses` (
	`id` VARCHAR(6),
	`title` VARCHAR(100),
	PRIMARY KEY (`id`)
);

CREATE VIEW modules_with_grades AS
SELECT
	c.id,
	c.title,
	FLOOR(RAND() * 100) as grade
FROM
	courses c;

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


CREATE TABLE `users` (
	`id` VARCHAR(9),
	`name` VARCHAR(50),
	`email` VARCHAR(100),		
	`avatar_url` VARCHAR(250),	
	PRIMARY KEY (`id`)
);


CREATE TABLE `study_sessions` (
	`id` VARCHAR(5) NOT NULL,
	`title` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO
	study_sessions(id, title)
VALUES
	('19|04', 'April 2019'),
	('19|10', 'October 2019'),
	('20|04', 'April 2020'),
	('20|10', 'October 2020'),
	('21|04', 'April 2021'),
	('21|10', 'October 2021');

CREATE TABLE `grades` (
	`id` int NOT NULL AUTO_INCREMENT,
	`course_id` VARCHAR(6) NOT NULL,
	`study_session_id` VARCHAR(5) NOT NULL,
	`user_id` VARCHAR(9) NOT NULL,
	`grade` SMALLINT NOT NULL,
	`anonymous` BOOLEAN NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	FOREIGN KEY (course_id) REFERENCES courses(id), -- only known courses
	FOREIGN KEY (study_session_id) REFERENCES study_sessions(id), -- only known study sessions
  	UNIQUE KEY `course_user` (`course_id`,`user_id`) -- one grade is allowed per course for any user
);

INSERT INTO
	grades(course_id, study_session_id, user_id, grade, anonymous)
VALUES
	('CM1015', '19|04', 'U00000000', 65, 1),
	('CM1015', '19|04', 'U00000001', 95, 0),
	('CM1015', '19|04', 'U00000002', 72, 1),
	('CM1015', '20|04', 'U00000003', 98, 0),
	('CM1015', '20|04', 'U00000004', 92, 0),
	('CM1015', '20|04', 'U00000005', 62, 1),
	('CM1015', '20|04', 'U00000006', 71, 1);

INSERT INTO
	users(id, name, email)
VALUES
	('U00000000', 'Alex', 'alex@something.com'),
	('U00000001', 'Arjun', 'arjun@something.com'),
	('U00000002', 'Blair Currey', 'curreyb88@gmail.com'),
	('U00000003', 'Brad', 'brad@something.com'),
	('U00000004', 'Hayato Ishida', 'hayato@something.com'),
	('U00000005', 'Bob', 'bob@something.com'),
	('U00000006', 'Alice', 'alice@something.com');
