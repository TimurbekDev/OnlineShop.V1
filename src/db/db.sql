CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	image_url VARCHAR(200) NOT NULL,
	category_id INT,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description TEXT,
	price DECIMAL(20, 2) NOT NULL,
	image_url VARCHAR(200) NOT NULL,
	category_id INT,
	count INT,
	
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE 
);




CREATE TABLE customers (
	id SERIAL PRIMARY KEY,
	full_name VARCHAR(200) NOT NULL,
	email VARCHAR UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	image_url VARCHAR(200)
);




CREATE TYPE order_status AS ENUM ('canceled', 'pending', 'completed', 'payed');




CREATE TABLE orders (
  id SERIAL PRIMARY KEY ,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_status order_status DEFAULT 'pending',
  customer_id INT,

  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);




CREATE TABLE order_items (
	id SERIAL PRIMARY KEY,
	quantity INT NOT NULL,
	price INT NOT NULL,
	product_id INT NOT NULL,
	order_id INT NOT NULL,
	
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	
	FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE 
);




CREATE TABLE contract_types(
	id SERIAL PRIMARY KEY,
	duration INT,
	percentage INT NOT NULL
);


CREATE TYPE contract_status AS ENUM ('pending', 'completed');





CREATE TABLE contracts(
	id SERIAL PRIMARY KEY,
	customer_id INT NOT NULL,
	order_id INT NOT NULL,
	monthly_payment_price DECIMAL(20, 2) NOT NULL,
	contract_type_id INT,
	contract_status contract_status DEFAULT 'pending',
	initial_payment_percentage INT NOT NULL ,
	total_price DECIMAL(20, 2) NOT NULL,

	FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
	FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE, 
	FOREIGN KEY (contract_type_id) REFERENCES contracts(id) ON DELETE CASCADE
);






CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  total_price DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id INT NOT NULL,
  contract_id INT NOT NULL,

  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE ,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE 
);





-- logged updated categories trigger 
CREATE TABLE categories_update_log (
  category_id INT,
  old_category_name VARCHAR(255),
  old_category_image_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION category_update_trg_fn () 
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

INSERT INTO categories_update_log(category_id, old_category_name, old_category_image_url) VALUES (OLD.id, OLD.name, OLD.image_url);

RETURN NEW;

END;
$$;

CREATE TRIGGER categories_update_trg
BEFORE UPDATE
ON categories
FOR EACH ROW
EXECUTE FUNCTION category_update_trg_fn();








-- 1 - create deleted_products table to save deleted product
CREATE TABLE deleted_products(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL ,
	price INT NOT NULL ,
	image_url VARCHAR(265),
	category_id INT,
	deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)

-- 2 - create function to save deleted product 
CREATE OR REPLACE FUNCTION save_deleted_product()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO deleted_products(id, name, price, image_url, category_id)
	VALUES(OLD.id, OLD.name, OLD.price, OLD.image_url , OLD.category_id);

	RETURN OLD;
END; 
$$ LANGUAGE plpgsql;



-- 3 - create trigger to execute save_deleted_product
CREATE TRIGGER deleted_product_trg
BEFORE DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION save_deleted_product();