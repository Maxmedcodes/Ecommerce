-- CReating Ecommerce Database for all the Categories

-- Creating the database for Furniture  replicate for other categoreis
CREATE DATABASE Furniture(
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    price int NOT NULL,
    stock int ,
    description VARCHAR(70),
    rating int,
    image_src VARCHAR(255) NOT NULL
    
);
-- Inserting Data into Pcs&Laptops Table
INSERT INTO public."PC_Laptops" (product_code, product_name, price, stock, description, rating)
VALUES
('PCL001', 'MacBook Gen2', 1200, 10, 'Lightweight, high-performance laptop', 5),
('PCL002', 'Samsung Zn Laptop', 850, 15, 'Efficient and portable laptop', 4),
('PCL003', 'Lenovo Laptop', 750, 20, 'Durable and reliable for work', 4),
('PCL004', 'Toshiba PC Set (with Speakers)', 950, 8, 'Desktop with full accessories', 4),
('PCL005', 'MacBook Gen5', 1500, 5, 'Newest MacBook with advanced features', 5),
('PCL006', 'iMac', 1800, 7, 'All-in-one desktop computer', 5);

--  data for phones&tablets
INSERT INTO public."Phones_Tablets" (product_code, product_name, price, stock, description, rating)
VALUES
('PT001', 'Samsung Galaxy S9 Ultra', 1000, 12, 'High-end smartphone with great camera', 5),
('PT002', 'iPhone 9', 850, 18, 'Apple smartphone with sleek design', 4),
('PT003', 'iPhone 13', 1200, 10, 'Latest iPhone with advanced features', 5),
('PT004', 'Samsung Tablet Pro', 900, 8, 'Professional-grade Android tablet', 4),
('PT005', 'Samsung Galaxy 3', 600, 20, 'Affordable and efficient smartphone', 4),
('PT006', 'Surface Pro Tablet', 1100, 6, 'Tablet with laptop-like functionality', 5);
 
 INSERT INTO public."Phones_Tablets" (product_code, product_name, price, stock, description, rating)
VALUES
('PT001', 'Samsung Galaxy S9 Ultra', 1000, 12, 'High-end smartphone with great camera', 5),
('PT002', 'iPhone 9', 850, 18, 'Apple smartphone with sleek design', 4),
('PT003', 'iPhone 13', 1200, 10, 'Latest iPhone with advanced features', 5),
('PT004', 'Samsung Tablet Pro', 900, 8, 'Professional-grade Android tablet', 4),
('PT005', 'Samsung Galaxy 3', 600, 20, 'Affordable and efficient smartphone', 4),
('PT006', 'Surface Pro Tablet', 1100, 6, 'Tablet with laptop-like functionality', 5);

INSERT INTO public."Gaming" (product_code, product_name, price, stock, description, rating)
VALUES
('GM001', 'PS5', 500, 12, 'Sony PlayStation 5 gaming console', 5),
('GM002', 'Xbox One', 450, 15, 'Microsoft Xbox One gaming console', 4),
('GM003', 'Steam Deck', 400, 10, 'Portable PC gaming device', 4),
('GM004', 'Nintendo Switch', 350, 18, 'Hybrid gaming console', 5),
('GM005', 'PSP', 200, 25, 'Handheld PlayStation Portable', 3),
('GM006', 'PS4', 300, 20, 'Previous-gen PlayStation gaming console', 4);


INSERT INTO public."Furniture" (product_code, product_name, price, stock, description, rating)
VALUES
('FR001', 'Sofa', 400, 8, 'Comfortable modern sofa', 4),
('FR002', 'Furniture Set (with Lamp)', 1000, 5, 'Complete furniture set for living room', 5),
('FR003', 'Modern ArmChair', 250, 10, 'Stylish and ergonomic armchair', 4),
('FR004', 'Dining Table and Chair', 750, 6, 'Elegant dining set', 5),
('FR005', 'Corner Sofa', 600, 7, 'Space-saving and comfortable', 4),
('FR006', 'Living Room Furniture Set', 1200, 4, 'Sophisticated and complete setup', 5);

INSERT INTO public."Miscellaneous" (product_code, product_name, price, stock, description, rating)
VALUES
('MS001', 'Apple Watch', 400, 12, 'Smartwatch with fitness tracking', 5),
('MS002', 'Espresso Machine', 200, 10, 'Make barista-quality coffee at home', 4),
('MS003', 'Samsung Galaxy SmartWatch', 300, 8, 'Feature-rich smartwatch', 4),
('MS004', 'Xtron Drone', 800, 5, 'High-performance quadcopter drone', 5),
('MS005', 'Set of DIY Tools', 150, 20, 'Comprehensive toolset for DIY projects', 4),
('MS006', 'Drone Helicopter', 600, 6, 'Advanced drone with camera', 5);


-- Adding Image src to the Phones&Tablets Table/ Replicate for other categoreis 
UPDATE public."Furniture" 
SET image_src = './images/sofa.jpg'
WHERE product_name = 'Samsung Galaxy S9 Ultra';

UPDATE public."Phones&Tablets" 
SET image_src = './images/furniture-2.jpg'
WHERE product_name = 'iPhone 9';

UPDATE public."Phones&Tablets" 
SET image_src = './images/iphoneX.jpg'
WHERE product_name = 'iPhone 13';

UPDATE public."Phones&Tablets" 
SET image_src = './images/samsung-tablet.jpg'
WHERE product_name = 'Samsung Tablet Pro';

UPDATE public."Phones&Tablets" 
SET image_src = './images/samsung-phone.jpg'
WHERE product_name = 'Samsung Galaxy 3';

UPDATE public."Phones&Tablets" 
SET image_src = './images/surface-tablet.jpg'
WHERE product_name = 'Surface Pro Tablet';

-- Adding Image src using CASE replicate for other tables
UPDATE public."Pcs&Laptops"
SET image_src = CASE
    WHEN product_name = 'MacBook Gen2' THEN './images/Mac-laptop.jpg'
    WHEN product_name = 'Samsung' THEN '/images/samsung-laptop.jpg'
    WHEN product_name = 'Modern ArmChair' THEN './images/lenovo-laptop.jpg'
    WHEN product_name = 'Dining Table and Chair' THEN './images/toshiba-pc.jpg'
    WHEN product_name = 'Corner Sofa' THEN './images/Mac3-laptop.jpg'
    WHEN product_name = 'Living Room Furniture Set' THEN './images/imac-pc.jpg'
    ELSE image_src
END;

UPDATE public."Pcs&Laptops"
SET image_src = CASE
    WHEN product_name = 'MacBook Gen2' THEN './images/Mac-laptop.jpg'
    WHEN product_name = 'Samsung Zn Laptop' THEN '/images/samsung-laptop.jpg'
    WHEN product_name = 'Lenovo Laptop' THEN './images/lenovo-laptop.jpg'
    WHEN product_name = 'Toshiba PC Set (with Speakers)' THEN './images/toshiba-pc.jpg'
    WHEN product_name = 'MacBook Gen5' THEN './images/Mac3-laptop.jpg'
    WHEN product_name = 'iMac' THEN './images/imac-pc.jpg'
    ELSE image_src
END;

UPDATE public."Mischellanous"
SET image_src = CASE
    WHEN product_name = 'Apple Watch' THEN './images/applewatch.jpg'
    WHEN product_name = 'Espresso Machine' THEN './images/cofee-machine.jpg'
    WHEN product_name = 'Samsung Galaxy SmartWatch' THEN './images/smartwatch.jpg'
    WHEN product_name = 'Xtron Drone' THEN './images/minidrone.jpg'
    WHEN product_name = 'Set of DIY Tools' THEN './images/diy.jpg'
    WHEN product_name = 'Drone Helicopter' THEN './images/helicopter.jpg'
    ELSE image_src
END;