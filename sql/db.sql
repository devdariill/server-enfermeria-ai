-- Drop the database if it exists
DROP DATABASE IF EXISTS EnfermeriaDB;

-- Create the database
CREATE DATABASE EnfermeriaDB;

-- Use the database
USE EnfermeriaDB;

-- Create the Terceros table
CREATE TABLE Terceros (
  id INT NOT NULL AUTO_INCREMENT,
  id_nacional INT UNIQUE NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  estado_civil VARCHAR(50) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  procedencia VARCHAR(50) NOT NULL,
  residencia VARCHAR(50) NOT NULL,
  fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  celular INT NOT NULL,
  PRIMARY KEY (id)
);

-- Create the Usuarios table
CREATE TABLE Usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  gmail VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Create the HistoriasClinicas table
CREATE TABLE Historias_Clinicas (
  id INT NOT NULL AUTO_INCREMENT,
  programa VARCHAR(50),
  codigo VARCHAR(50),
  eps VARCHAR(50),

  id_tercero INT NOT NULL,
  
  motivo_consulta TEXT,
  enfermedad_actual TEXT,
  antecedente_familiar TEXT,
  antecedente_personal TEXT,
  habitos TEXT,
  antecedentes_ginecologico TEXT,
  ta VARCHAR(50),
  fc VARCHAR(50),
  p VARCHAR(50),
  r VARCHAR(50),
  t VARCHAR(50),
  peso VARCHAR(50),
  talla VARCHAR(50),
  piel_faneras VARCHAR(200),
  cabeza VARCHAR(200),
  ojos VARCHAR(200),
  nariz VARCHAR(200),
  oidos VARCHAR(200),
  boca VARCHAR(200),
  cuello VARCHAR(200),
  torax VARCHAR(200),
  corazon VARCHAR(200),
  pulmones VARCHAR(200),
  abdomen VARCHAR(200),
  extremidades VARCHAR(200),
  genitourinario VARCHAR(200),
  e_neurologico_elemental VARCHAR(200),
  impresion_diagnostica VARCHAR(200),
  tratamiento TEXT,
  firma INT NOT NULL,

  acudiente VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (id_tercero) REFERENCES Terceros (id),
  FOREIGN KEY (firma) REFERENCES Usuarios (id)
);

-- insert data into the Usuarios table
INSERT INTO Usuarios (gmail)
VALUES
('admin@umariana.edu.co');


-- Insert data into the Terceros table
INSERT INTO Terceros (id_nacional, nombres, apellidos, fecha_nacimiento, estado_civil, genero, procedencia, residencia, celular)
VALUES
(123456789, 'John', 'Doe', '1990-01-15', 'Single', 'Male', 'City', 'City', 555555555),
(987654321, 'Jane', 'Smith', '1985-05-20', 'Married', 'Female', 'Suburb', 'Suburb', 555123456);

-- Insert data into the Historias_Clinicas table
INSERT INTO Historias_Clinicas (programa, codigo, eps, id_tercero, motivo_consulta, enfermedad_actual, antecedente_familiar, antecedente_personal, habitos, antecedentes_ginecologico, ta, fc, p, r, t, peso, talla, piel_faneras, cabeza, ojos, nariz, oidos, boca, cuello, torax, corazon, pulmones, abdomen, extremidades, genitourinario, e_neurologico_elemental, impresion_diagnostica, tratamiento, firma)
VALUES
('Program A', '12345', 'EPS A', 1, 'Headache', 'Fever', 'None', 'None', 'Good', 'None', '120/80', '75', '16', '18', '98.6', '70 kg', '170 cm', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Treatment A', 1),
('Program B', '54321', 'EPS B', 2, 'Back pain', 'Flu', 'Hypertension', 'None', 'Good', 'None', '130/90', '80', '16', '18', '98.4', '65 kg', '165 cm', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Treatment B', 1);

