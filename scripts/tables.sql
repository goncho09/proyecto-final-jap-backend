USE `proyecto-final-jap`;

CREATE TABLE ventas (
  id int NOT NULL AUTO_INCREMENT,
  usuario varchar(255) NOT NULL,
  total float NOT NULL,
  fecha date NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE venta_detalle (
  ventaID int NOT NULL,
  productoID int NOT NULL,
  cantidad int NOT NULL,
  precioUnitario float NOT NULL,
  subtotal float NOT NULL,
  PRIMARY KEY (ventaID, productoID)
);