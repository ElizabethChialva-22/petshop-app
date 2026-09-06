CREATE DATABASE IF NOT EXISTS petshop;
USE petshop;


DROP TABLE IF EXISTS api_usuario;
CREATE TABLE api_usuario (
                             id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(100) NOT NULL,
                             email VARCHAR(254) NOT NULL UNIQUE,
                             password VARCHAR(128) NOT NULL DEFAULT '',
                             token VARCHAR(64) UNIQUE NULL,
                             telefono VARCHAR(20) NULL,
                             direccion VARCHAR(100) NULL,
                             role VARCHAR(15) NOT NULL DEFAULT 'cliente'
);


DROP TABLE IF EXISTS api_categoria;
CREATE TABLE api_categoria (
                               id_categoria INT AUTO_INCREMENT PRIMARY KEY,
                               nombre VARCHAR(100) NOT NULL
);


DROP TABLE IF EXISTS api_mascota;
CREATE TABLE api_mascota (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             nombre VARCHAR(100) NOT NULL,
                             especie VARCHAR(50) NOT NULL,
                             raza VARCHAR(50) NOT NULL,
                             peso INT NOT NULL,
                             fecha_nacimiento DATE NOT NULL,
                             id_dueno_id INT NOT NULL,
                             FOREIGN KEY (id_dueno_id) REFERENCES api_usuario(id_usuario) ON DELETE CASCADE
);


DROP TABLE IF EXISTS api_vacuna;
CREATE TABLE api_vacuna (
                            id_vacuna INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            descripcion LONGTEXT NOT NULL,
                            frecuencia VARCHAR(50) NOT NULL
);


DROP TABLE IF EXISTS api_vacunacion;
CREATE TABLE api_vacunacion (
                                id_vacunacion INT AUTO_INCREMENT PRIMARY KEY,
                                id_mascota_id INT NOT NULL,
                                nombre_vacuna VARCHAR(100) NOT NULL,
                                fecha_aplicacion DATE NOT NULL,
                                proxima_dosis DATE NULL,
                                veterinario VARCHAR(100) NOT NULL,
                                FOREIGN KEY (id_mascota_id) REFERENCES api_mascota(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS api_turno;
CREATE TABLE api_turno (
                           id_turno INT AUTO_INCREMENT PRIMARY KEY,
                           id_mascota_id INT NOT NULL,
                           fecha DATE NOT NULL,
                           motivo VARCHAR(200) NOT NULL,
                           estado VARCHAR(15) NOT NULL,
                           observaciones LONGTEXT NULL,
                           FOREIGN KEY (id_mascota_id) REFERENCES api_mascota(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS api_producto;
CREATE TABLE api_producto (
                              id_producto INT AUTO_INCREMENT PRIMARY KEY,
                              nombre VARCHAR(100) NOT NULL,
                              descripcion LONGTEXT NOT NULL,
                              precio DECIMAL(10, 2) NOT NULL,
                              stock INT NOT NULL,
                              id_categoria_id INT NOT NULL,
                              imagen VARCHAR(200) NULL,
                              FOREIGN KEY (id_categoria_id) REFERENCES api_categoria(id_categoria) ON DELETE CASCADE
);


INSERT INTO api_categoria (nombre) VALUES
                                       ('Alimentos'),
                                       ('Higiene'),
                                       ('Juguetes'),
                                       ('Accesorios'),
                                       ('Medicamentos');
