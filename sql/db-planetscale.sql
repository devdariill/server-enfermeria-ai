-- Drop the database if it exists
-- DROP DATABASE IF EXISTS EnfermeriaDB;

-- Create the database
-- CREATE DATABASE EnfermeriaDB;

-- Use the database
USE `deploy-u`;

-- Create the terceros table
CREATE TABLE terceros (
  id INT NOT NULL AUTO_INCREMENT,
  id_nacional INT UNIQUE NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  estado_civil VARCHAR(50) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  procedencia VARCHAR(50) NOT NULL,
  residencia VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  celular INT NOT NULL,
  PRIMARY KEY (id)
);

-- Create the usuarios table
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  gmail VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Create the HistoriasClinicas table
CREATE TABLE historias_clinicas (
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

  observaciones TEXT,

  acudiente VARCHAR(255),
  PRIMARY KEY (id)
);

-- insert data into the usuarios table
INSERT INTO usuarios (gmail)
VALUES
('admin@umariana.edu.co');


-- Insert data into the terceros table
INSERT INTO terceros (id_nacional, nombres, apellidos, fecha_nacimiento, estado_civil, genero, procedencia, residencia, celular)
VALUES
(123456789, 'John', 'Doe', '1990-01-15', 'Single', 'Male', 'City', 'City', 555555555),
(987654321, 'Jane', 'Smith', '1985-05-20', 'Married', 'Female', 'Suburb', 'Suburb', 555123456);

-- Insert data into the historias_clinicas table
INSERT INTO historias_clinicas (programa, codigo, eps, id_tercero, motivo_consulta, enfermedad_actual, antecedente_familiar, antecedente_personal, habitos, antecedentes_ginecologico, ta, fc, p, r, t, peso, talla, piel_faneras, cabeza, ojos, nariz, oidos, boca, cuello, torax, corazon, pulmones, abdomen, extremidades, genitourinario, e_neurologico_elemental, impresion_diagnostica, tratamiento, firma)
VALUES ('Program A', '12345', 'EPS A', 1, 'Headache', 'Fever', 'None', 'None', 'Good', 'None', '120/80', '75', '16', '18', '98.6', '70 kg', '170 cm', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Treatment A', 1),
('Program B', '54321', 'EPS B', 2, 'Back pain', 'Flu', 'Hypertension', 'None', 'Good', 'None', '130/90', '80', '16', '18', '98.4', '65 kg', '165 cm', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Treatment B', 1);

CREATE TABLE planificaciones (
  id INT NOT NULL AUTO_INCREMENT,
  id_historia INT NOT NULL,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Menor de 18, Mayor 35
  h_c INT,

  alfabeta INT DEFAULT 0, -- 1 si, 0 no
  estudios VARCHAR(50), -- ning, prim, sec, univ
  anos_estudio INT,
  estado_civil VARCHAR(50), -- sol,cas, ul, otra
  estado_ocu VARCHAR(50), -- estud, trab

  af_diabetes INT DEFAULT 0, -- 1 si, 0 no
  af_hipertension INT DEFAULT 0, -- 1 si, 0 no
  af_ca_seno INT DEFAULT 0, -- 1 si, 0 no
  af_ca_cervix INT DEFAULT 0, -- 1 si, 0 no
  af_enf_cong INT DEFAULT 0, -- 1 si, 0 no
  af_otros VARCHAR(255), -- 1 si, 0 no

  ap_diabetes INT DEFAULT 0, -- 1 si, 0 no
  ap_hipertension INT DEFAULT 0, -- 1 si, 0 no
  ap_cancer INT DEFAULT 0, -- 1 si, 0 no
  ap_ictericia INT DEFAULT 0, -- 1 si, 0 no
  ap_infertil INT DEFAULT 0, -- 1 si, 0 no
  ap_enf_cong INT DEFAULT 0, -- 1 si, 0 no
  ap_otros VARCHAR(255), -- 1 si, 0 no

  -- inicio R.S
  n_comp INT,
  enf_t_sex INT DEFAULT 0, -- 1 si, 0 no
  cual VARCHAR(255),

  -- ult_citoligia
  mes INT,
  ano INT DEFAULT 0,
  nega INT DEFAULT 0, -- 1 si, 0 no
  nic INT DEFAULT 0, -- 1 si, 0 no
  nunca INT DEFAULT 0, -- 1 si, 0 no

  -- obstetricos 
  gastac INT, 
  ninguno INT DEFAULT 0, 
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
  mtos_primer_sem INT,
  fec_ant_embarazo DATE,

  -- sensible
  grupo VARCHAR(50),
  rh VARCHAR(1), -- +, -
  sensible INT, -- 1 si, 0 no

  fuma INT, -- 1 si, 0 no
  cig_d INT,

  vdrl_mes INT,
  vdrl_ano INT,
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

  PRIMARY KEY (id)
);

CREATE TABLE seccion_b (
  id INT NOT NULL AUTO_INCREMENT,
  id_planificacion INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

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

  PRIMARY KEY (id)
);

INSERT INTO planificaciones (id_historia,h_c,alfabeta,estudios,anos_estudio,estado_civil,estado_ocu,af_diabetes,af_hipertension,af_ca_seno,af_ca_cervix,af_enf_cong,af_otros,ap_diabetes,ap_hipertension,ap_cancer,ap_ictericia,ap_infertil,ap_enf_cong,ap_otros,n_comp,enf_t_sex,cual,mes,ano,neg,nic,nunca,gastac,ninguno,gemelar,mola,abortos,p_vag,cesarea,ectopica,esp,provoc,nac_vivos,nac_mtos,vive,mtos_primer_sem,fec_ant_embarazo,grupo,rh,sensible,fuma,cig_d,vdrl_mes,vdrl_ano,negativo,positivo,aco,diu,inyectable,implante,um_ninguno,condon,ritmo,otras,vosec,tiempo,observaciones)VALUES(1,1,1,'univ',4,'sol','estud',1,1,0,1,0,'ning',0,1,0,0,1,0,'ning',2,1,'ning',6,2023,0,1,0,0,1,0,0,0,1,0,0,0,0,2,0,1,3,'2023-09-27','grupo','+',1,1,10,3,2023,0,1,1,0,1,0,0,1,0,0,0,6,'Observacionesdeejemplo');

INSERT INTO seccion_b (id_planificacion,metodo,ciclos,amenorrea,sangrado,manchado,fum,lactando,cefalea_mareo,dolor_mamario,dolor_pelvico,flujo_caracter,varices,senos,abdomen,cervix,utero,anexos,t_a_mm_hg,peso_kg,cambio_metodo,motivo,nuevo_metodo,observaciones,citologia) VALUES (1,'Método anticonceptivo utilizado','Descripción de ciclos menstruales','Descripción de amenorrea','Descripción de sangrado','Descripción de manchado','Descripción de fecha de última menstruación','Descripción de lactancia','Descripción de cefalea/mareo','Descripción de dolor mamario','Descripción de dolor pélvico','Descripción de flujo característico','Descripción de varices','Descripción de senos','Descripción de abdomen','Descripción de cervix','Descripción de útero','Descripción de anexos','Descripción de tensión arterial (mm Hg)','Descripción de peso (kg)','Descripción de cambio de método','Descripción del motivo','Descripción del nuevo método','Descripción de observaciones','Descripción de citología' );
