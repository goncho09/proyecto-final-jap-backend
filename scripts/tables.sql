DROP DATABASE IF EXISTS `proyecto-final-jap`;

CREATE DATABASE IF NOT EXISTS `proyecto-final-jap`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_uca1400_ai_ci;

USE `proyecto-final-jap`;

CREATE TABLE categorias (
  ID int NOT NULL,
  nombre varchar(50) NOT NULL,
  descripcion varchar(255) NOT NULL,
  imagen varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE productos (
  ID int NOT NULL,
  nombre varchar(50) NOT NULL,
  descripcion varchar(255) NOT NULL,
  costo float NOT NULL,
  moneda varchar(50) NOT NULL,
  categoriaID int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (categoriaID) REFERENCES categorias(ID)
);

CREATE TABLE productos_imagenes (
  ID int NOT NULL AUTO_INCREMENT,
  productoID int NOT NULL,
  url varchar(255) NOT NULL,
  orden int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (productoID) REFERENCES productos(ID)
);

CREATE TABLE productos_relacionados (
  productoID int NOT NULL,
  productoRelacionadoID int NOT NULL,
  PRIMARY KEY (productoID, productoRelacionadoID),
  FOREIGN KEY (productoID) REFERENCES productos(ID),
  FOREIGN KEY (productoRelacionadoID) REFERENCES productos(ID)
);

CREATE TABLE usuarios (
  nombre varchar(50) NOT NULL,
  apellido varchar(50) NOT NULL,
  email varchar(255) NOT NULL,
  telefono varchar(50) NOT NULL,
  fotoPerfil varchar(50) DEFAULT 'default.png',
  contrasena varchar(255) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE carrito (
  productoId int NOT NULL,
  usuario varchar(255) NOT NULL,
  cantidad int NOT NULL,
  PRIMARY KEY (usuario, productoId),
  FOREIGN KEY (productoId) REFERENCES productos(ID),
  FOREIGN KEY (usuario) REFERENCES usuarios(email)
);

CREATE TABLE comentarios (
  id int NOT NULL AUTO_INCREMENT,
  descripcion varchar(255) NOT NULL,
  fechaHora datetime NOT NULL,
  usuario varchar(255) NOT NULL,
  productId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario) REFERENCES usuarios(email),
  FOREIGN KEY (productId) REFERENCES productos(ID)
);

CREATE TABLE ventas (
  id int NOT NULL AUTO_INCREMENT,
  usuario varchar(255) NOT NULL,
  total float NOT NULL,
  fecha date NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario) REFERENCES usuarios(email)
);

CREATE TABLE venta_detalle (
  ventaID int NOT NULL,
  productoID int NOT NULL,
  cantidad int NOT NULL,
  precioUnitario float NOT NULL,
  subtotal float NOT NULL,
  PRIMARY KEY (ventaID, productoID),
  FOREIGN KEY (ventaID) REFERENCES ventas(id),
  FOREIGN KEY (productoID) REFERENCES productos(ID)
);