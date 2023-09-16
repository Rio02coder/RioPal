CREATE DATABASE Riopal

USE Riopal;

CREATE TABLE Product(
id int AUTO_INCREMENT PRIMARY KEY,
productName VARCHAR(225) NOT NULL,
price FLOAT NOT NULL,
quantity int NOT NULL
);

CREATE TABLE `Order` (
id int AUTO_INCREMENT PRIMARY KEY,
productId int,
price FLOAT NOT NULL,
hasPaid BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);