DROP TABLE IF EXISTS db_connection CASCADE;
DROP TABLE IF EXISTS document_filetype CASCADE;
DROP TABLE IF EXISTS document CASCADE;
DROP TABLE IF EXISTS document_chunk CASCADE;
DROP TABLE IF EXISTS embedding CASCADE;
DROP TABLE IF EXISTS documentation CASCADE;


CREATE TABLE db_connection (
    id SERIAL PRIMARY KEY,
    host VARCHAR(50) NOT NULL,
    dbname VARCHAR(50) NOT NULL,
    "user" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    port VARCHAR(50) NOT NULL
);

CREATE TABLE document_filetype (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE document (
    id SERIAL PRIMARY KEY,
    document_url VARCHAR(255) NOT NULL,
    document_type_id INT REFERENCES document_filetype(id)
);

CREATE TABLE embedding (
    id SERIAL PRIMARY KEY,
    value VECTOR(1538)
);

CREATE TABLE document_chunk (
    id SERIAL PRIMARY KEY,
    content TEXT,
    document_id INT REFERENCES document(id),
    embedding_id INT REFERENCES embedding(id)
);

CREATE TABLE documentation (
    id SERIAL PRIMARY KEY,
    content TEXT
);

-- Drop the database if it exists
DROP DATABASE IF EXISTS example_db WITH (FORCE);

-- Create a new database named example_db
CREATE DATABASE example_db;

-- Connect to the new database
\c example_db

DROP ROLE IF EXISTS exampleusername;

CREATE USER exampleusername WITH SUPERUSER PASSWORD 'example_password';

-- Grant all privileges to the user on all tables in the database
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO exampleusername;



-- Drop tables if they exist
DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Classrooms;
DROP TABLE IF EXISTS Instructors;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Students;

-- Create Students table
CREATE TABLE Students (
    StudentID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    Email VARCHAR(100) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15),
    EnrollmentDate DATE NOT NULL
);

-- Create Courses table
CREATE TABLE Courses (
    CourseID SERIAL PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    CourseCode VARCHAR(10) UNIQUE NOT NULL,
    Credits INT CHECK (Credits > 0),
    Department VARCHAR(50)
);

-- Create Instructors table
CREATE TABLE Instructors (
    InstructorID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    HireDate DATE NOT NULL,
    PhoneNumber VARCHAR(15),
    Department VARCHAR(50)
);

-- Create Classrooms table
CREATE TABLE Classrooms (
    ClassroomID SERIAL PRIMARY KEY,
    RoomNumber VARCHAR(10) UNIQUE NOT NULL,
    BuildingName VARCHAR(50) NOT NULL,
    Capacity INT CHECK (Capacity > 0)
);

-- Create Enrollments table (Junction table)
CREATE TABLE Enrollments (
    EnrollmentID SERIAL PRIMARY KEY,
    StudentID INT REFERENCES Students(StudentID) ON DELETE CASCADE,
    CourseID INT REFERENCES Courses(CourseID) ON DELETE CASCADE,
    EnrollmentDate DATE NOT NULL,
    Grade CHAR(2) CHECK (Grade IN ('A', 'B', 'C', 'D', 'F', 'W', NULL))
);