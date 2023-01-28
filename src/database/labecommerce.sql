-- Active: 1674673840555@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    delivered_at TEXT DEFAULT(DATETIME()),
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users (id)
);

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM purchases;

SELECT * FROM purchases_products;

SELECT * FROM products
WHERE name = 'anel';

DROP TABLE purchases;

INSERT INTO users(id,email,password)
VALUES
("001", "luiza@gemail.com", "123456"),
("002", "julio@gemail.com", "567890"),
("003", "natalia@gemail.com", "001890");

INSERT INTO products(id,name,price,category)
VALUES
("1011", "anel", 40, "acessorio"),
("1012", "camiseta", 80, "roupa"),
("1013", "PS4", 1500, "eletronico"),
("1014", "Iwatch", 2400, "eletronico"),
("1015", "brinco", 20, "acessorio");

INSERT INTO purchases(id,total_price,paid,buyer_id)
VALUES
    ("p001", 1500, 1, "001"),
    ("p002", 40, 1, "001"),
    ("p003", 4800, 1, "002"),
    ("p004", 120, 0, "002"),
    ("p005", 100, 1, "003"),
    ("p006", 80, 0, "003");

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
    ("p001", "1013", 1), 
    ("p002", "1011", 1), 
    ("p003", "1014", 2), 
    ("p004", "1011", 3), 
    ("p005", "1015", 5), 
    ("p006", "1012", 1);

SELECT * FROM purchases_products
INNER JOIN products 
ON purchases_products.product_id = products.id
INNER JOIN purchases 
ON purchases_products.purchase_id = purchases.id
INNER JOIN users
ON purchases.buyer_id = users.id;


