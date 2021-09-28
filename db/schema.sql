DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);
CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  department_id INT 
);
CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);