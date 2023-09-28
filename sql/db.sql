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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

CREATE TABLE Planificaciones (
  id INT NOT NULL AUTO_INCREMENT,
  id_tercero INT NOT NULL,  
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Menor de 18, Mayor 35
  h_c INT,

  alfabeta INT, -- 1 si, 0 no
  estudios VARCHAR(50), -- ning, prim, sec, univ
  años_estudio INT,
  estado_civil VARCHAR(50), -- sol,cas, ul, otra
  estado_ocu VARCHAR(50), -- estud, trab

  af_diabetes INT, -- 1 si, 0 no
  af_hipertension INT, -- 1 si, 0 no
  af_ca_seno INT, -- 1 si, 0 no
  af_ca_cervix INT, -- 1 si, 0 no
  af_enf_cong INT, -- 1 si, 0 no
  af_otros VARCHAR(255), -- 1 si, 0 no

  ap_diabetes INT, -- 1 si, 0 no
  ap_hipertension INT, -- 1 si, 0 no
  ap_cancer INT, -- 1 si, 0 no
  ap_ictericia INT, -- 1 si, 0 no
  ap_infertil INT, -- 1 si, 0 no
  ap_enf_cong INT, -- 1 si, 0 no
  ap_otros VARCHAR(255), -- 1 si, 0 no

  -- inicio R.S
  n_comp INT,
  enf_t_sex INT, -- 1 si, 0 no
  cual VARCHAR(255),

  -- ult_citoligia
  mes INT,
  año INT,
  neg INT, -- 1 si, 0 no
  nic INT, -- 1 si, 0 no
  nunca INT, -- 1 si, 0 no

  -- obstetricos 
  gastac INT, 
  ninguno INT, 
  gemelar INT,
  mola INT,
  abortos INT,
  p_vag INT,
  cesarea INT,
  ectopica INT,
  esp INT,
  provoc INT,
  nac_vivos INT,
  nac_mtos INT, 
  vive INT,
  mtps_primera_sem INT,
  fec_ant_embarazo DATE,

  -- sensible
  grupo VARCHAR(50),
  rh1 VARCHAR(2),
  rh2 VARCHAR(2),
  sensible INT, -- 1 si, 0 no

  fuma INT, -- 1 si, 0 no
  cig_d INT,

  vdrl_mes INT,
  vdrl_año INT,
  negativo INT, -- 1 si, 0 no
  positivo INT, -- 1 si, 0 no

  -- ultimo metodo

  aco INT, -- 1 si, 0 no
  diu INT, -- 1 si, 0 no
  inyectable INT, -- 1 si, 0 no
  implante INT, -- 1 si, 0 no
  um_ninguno INT, -- 1 si, 0 no
  condon INT, -- 1 si, 0 no
  ritmo INT, -- 1 si, 0 no
  otras INT, -- 1 si, 0 no
  vosec INT, -- 1 si, 0 no
  tiempo INT, -- meses

  observaciones TEXT,

  PRIMARY KEY (id),
  FOREIGN KEY (id_tercero) REFERENCES Terceros (id)
);

CREATE TABLE Seccion_B (
  id INT NOT NULL AUTO_INCREMENT,
  id_tercero INT NOT NULL,
  id_planificacion INT NOT NULL,

  -- anamesis
  metodo TEXT,
  ciclos TEXT,
  amenorrea TEXT,
  sangrado TEXT,
  manchado TEXT,
  fum TEXT,
  lactando TEXT,
  cefalea_mareo TEXT,
  dolor_mamario TEXT,
  dolor_pelvico TEXT,
  flujo_caracter TEXT,
  varices TEXT,

  -- examen fisico
  senos TEXT,
  abdomen TEXT,
  cervix TEXT,
  utero TEXT,
  anexos TEXT,
  t_a_mm_hg TEXT,
  peso_kg TEXT,

  -- conducta
  cambio_metodo TEXT,
  motivo TEXT,
  nuevo_metodo TEXT,
  observaciones TEXT,
  citologia TEXT,

  PRIMARY KEY (id),
  FOREIGN KEY (id_tercero) REFERENCES Terceros (id),
  FOREIGN KEY (id_planificacion) REFERENCES Planificaciones (id)
);



