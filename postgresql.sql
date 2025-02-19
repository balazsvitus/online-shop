DROP TABLE IF EXISTS Stock;
DROP TABLE IF EXISTS OrderDetail;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS ProductCategory;

CREATE TABLE IF NOT EXISTS ProductCategory (
	Id INTEGER GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(50) NOT NULL,
	Description VARCHAR(500) NOT NULL,
	PRIMARY KEY(Id)
);

CREATE TABLE IF NOT EXISTS Product (
	Id INTEGER GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(50) NOT NULL,
	Description VARCHAR(500) NOT NULL,
	Price DECIMAL NOT NULL,
	Weight NUMERIC NOT NULL,
	Category INTEGER NOT NULL,
	Supplier VARCHAR(50) NOT NULL,
	ImageUrl VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id),
	CONSTRAINT fk_product FOREIGN KEY(Category) REFERENCES ProductCategory(Id)
);

CREATE TABLE IF NOT EXISTS Customer (
	Id INTEGER GENERATED ALWAYS AS IDENTITY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	Username VARCHAR(20) NOT NULL,
	Password VARCHAR(100) NOT NULL,
	EmailAddress VARCHAR(30) NOT NULL,
	PRIMARY KEY(Id)
);

CREATE TABLE IF NOT EXISTS Orders (
	Id INTEGER GENERATED ALWAYS AS IDENTITY,
	Customer INTEGER NOT NULL,
	CreatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
	Country VARCHAR(30) NOT NULL,
	City VARCHAR(30) NOT NULL,
	County VARCHAR(30) NOT NULL,
	StreetAddress VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id),
	CONSTRAINT fk_customer FOREIGN KEY(Customer) REFERENCES Customer(Id)
);

CREATE TABLE IF NOT EXISTS Location (
	Id INTEGER GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(30) NOT NULL,
	Country VARCHAR(30) NOT NULL,
	City VARCHAR(30) NOT NULL,
	County VARCHAR(30) NOT NULL,
	StreetAddress VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id)
);

CREATE TABLE IF NOT EXISTS OrderDetail (
	OrderId INTEGER,
	Product INTEGER,
	ShippedFrom INTEGER NOT NULL,
	Quantity INTEGER NOT NULL,
	PRIMARY KEY(OrderId, Product),
	CONSTRAINT fk_od_order FOREIGN KEY(OrderId) REFERENCES Orders(Id),
	CONSTRAINT fk_od_product FOREIGN KEY(Product) REFERENCES Product(Id),
	CONSTRAINT fk_od_location FOREIGN KEY(ShippedFrom) REFERENCES Location(Id)
);

CREATE TABLE IF NOT EXISTS Stock (
	Product INTEGER,
	Location INTEGER,
	Quantity INTEGER NOT NULL,
	PRIMARY KEY(Product, Location),
	CONSTRAINT fk_s_product FOREIGN KEY(Product) REFERENCES Product(Id),
	CONSTRAINT fk_s_location FOREIGN KEY(Location) REFERENCES Location(Id)
);
