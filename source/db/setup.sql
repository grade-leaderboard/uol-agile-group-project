DROP DATABASE IF EXISTS grades_leaderboard;
CREATE DATABASE IF NOT EXISTS grades_leaderboard CHARACTER SET utf8 COLLATE utf8_general_ci;

USE grades_leaderboard;

DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS study_sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP VIEW IF EXISTS modules_with_grades;
DROP VIEW IF EXISTS ranked_grades;

CREATE TABLE `courses` (
	`id` VARCHAR(6),
	`title` VARCHAR(100),
	PRIMARY KEY (`id`)
);

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

CREATE VIEW modules_with_grades AS
SELECT course_id id, courses.title title, ROUND(AVG(grade), 0) grade
  FROM grades
  JOIN courses ON course_id = courses.id
GROUP BY course_id;

CREATE VIEW ranked_grades AS
SELECT name, grade, course_id, anonymous, created_at, avatar_url,
RANK() OVER (PARTITION BY course_id ORDER BY course_id ASC, grade DESC) AS "ranking"
FROM grades
JOIN users
ON grades.user_id = users.id
ORDER BY course_id ASC, ranking ASC, created_at ASC;


INSERT INTO
	grades(course_id, study_session_id, user_id, grade, anonymous)
VALUES
	('CM1005', '19|04', 'UGYTW920K', 100,0),
	('CM1015', '19|04', 'UGYTW920K', 97, 0),
	('CM1030', '19|04', 'UGYTW920K', 84, 0),
	('CM1040', '19|04', 'UGYTW920K', 61, 1),
	('CM1010', '19|10', 'UGYTW920K', 76, 0),
	('CM1020', '19|10', 'UGYTW920K', 95, 0),
	('CM1025', '19|10', 'UGYTW920K', 95, 0),
	('CM1035', '19|10', 'UGYTW920K', 100,0),
	('CM2005', '20|04', 'UGYTW920K', 92, 0),
	('CM2035', '20|04', 'UGYTW920K', 96, 0),
	('CM2040', '20|04', 'UGYTW920K', 95, 0),
	('CM1005', '19|04', 'UGYHF87V3', 100, 0),
	('CM1015', '19|04', 'UGYHF87V3', 81, 0),
	('CM1040', '19|04', 'UGYHF87V3', 61, 1),
	('CM1010', '19|04', 'UGYHF87V3', 94, 0),
	('CM1020', '19|04', 'UGYHF87V3', 88, 0),
	('CM1025', '20|04', 'UGYHF87V3', 93, 0),
	('CM1035', '20|04', 'UGYHF87V3', 95, 0),
	('CM1005', '19|04', 'UH047P2KA', 93, 0),
	('CM1015', '19|04', 'UH047P2KA', 88, 0),
	('CM1030', '19|04', 'UH047P2KA', 68, 0),
	('CM1040', '19|04', 'UH047P2KA', 73, 0),
	('CM1010', '19|10', 'UH047P2KA', 77, 0),
	('CM1020', '19|10', 'UH047P2KA', 82, 0),
	('CM1025', '19|10', 'UH047P2KA', 78, 0),
	('CM1035', '19|10', 'UH047P2KA', 86, 0),
	('CM2005', '20|04', 'UH047P2KA', 84, 0),
	('CM2030', '20|04', 'UH047P2KA', 88, 0),
	('CM2035', '20|04', 'UH047P2KA', 78, 0),
	('CM2040', '20|04', 'UH047P2KA', 90, 0),
	('CM1005', '19|04', 'UHQTXAXDW', 100, 0),
	('CM1010', '19|10', 'UHQTXAXDW', 87, 0),
	('CM1015', '19|04', 'UHQTXAXDW', 88, 0),
	('CM1020', '19|10', 'UHQTXAXDW', 97, 0),
	('CM1025', '20|04', 'UHQTXAXDW', 96, 0),
	('CM1035', '19|10', 'UHQTXAXDW', 96, 0),
	('CM1040', '19|10', 'UHQTXAXDW', 74, 0),
	('CM2005', '20|04', 'UHQTXAXDW', 97, 0),
	('CM2035', '20|04', 'UHQTXAXDW', 91, 0),
	('CM2040', '20|04', 'UHQTXAXDW', 92, 0),
	('CM1005', '19|04', 'UGZRDUR1C', 80, 0),
	('CM1015', '19|04', 'UGZRDUR1C', 85, 0),
	('CM1030', '19|04', 'UGZRDUR1C', 57, 0),
	('CM1040', '19|04', 'UGZRDUR1C', 83, 1),
	('CM1010', '19|10', 'UGZRDUR1C', 50, 0),
	('CM1020', '19|10', 'UGZRDUR1C', 50, 0),
	('CM1025', '19|10', 'UGZRDUR1C', 90, 0),
	('CM1035', '19|10', 'UGZRDUR1C', 58, 0);

-- for test to check tie order is correct
INSERT INTO
	grades(course_id, study_session_id, user_id, grade, anonymous, created_at)
VALUES
	('CM3070', '21|04', 'U00000004', 95, 0, '2021-08-05 15:15:23'),
	('CM3070', '20|04', 'U00000002', 95, 0, '2020-08-01 12:10:23');

INSERT INTO
	users(id, name, email, avatar_url)
VALUES
	('UGYTW920K', 'Alex', 'alex@something.com', 'https://ca.slack-edge.com/TDT1N1BUG-UGYTW920K-g219487da2db-512'),
	('UGZRDUR1C', 'Arjun', 'arjun@muralidharan.org ', 'https://ca.slack-edge.com/TDT1N1BUG-UGZRDUR1C-6318825681ef-512'),
	('UHQTXAXDW', 'Blair Currey', 'curreyb88@gmail.com', 'https://avatars.slack-edge.com/2019-05-21/644070021751_4814ee9d9da3d9d49653_192.jpg'),
	('UGYHF87V3', 'Brad', 'brad@lazaruk.com', 'https://secure.gravatar.com/avatar/1f9963bd124c27493e14749e56db5d9f.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0026-192.png'),
	('UH047P2KA', 'Hayato', 'mhci1@student.london.ac.uk', 'https://ca.slack-edge.com/TDT1N1BUG-UH047P2KA-59cb020788e1-512'),
	('U00000005', 'Bob', 'bob@something.com', 'https://st4.depositphotos.com/5575514/23597/v/600/depositphotos_235978748-stock-illustration-neutral-profile-picture.jpg'),
	('U00000006', 'Alice', 'alice@something.com', 'https://st4.depositphotos.com/5575514/23597/v/600/depositphotos_235978748-stock-illustration-neutral-profile-picture.jpg');
