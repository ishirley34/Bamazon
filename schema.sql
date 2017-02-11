CREATE DATABASE Bamazon_db;
USE Bamazon_db;

CREATE TABLE products
(
item_id int NOT NULL AUTO_INCREMENT,
product_name VARCHAR(250) NOT NULL,
department_name VARCHAR(250) NOT NULL,
price INT(11) NOT NULL,
stock_quantity INT(11) NOT NULL,
PRIMARY KEY(item_id)
);
