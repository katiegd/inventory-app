const { Client } = require("pg");

const createSQLTable = `CREATE TABLE IF NOT EXISTS inventory ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(50), quantity INTEGER, price DECIMAL(5, 2), category VARCHAR(50), color VARCHAR(30), brand VARCHAR(50), src TEXT DEFAULT '/images/fork-knife-default.svg');`;

const createSQLData = `
INSERT INTO inventory (name, quantity, price, category, color, brand, src) VALUES
('Apple', 100, 0.50, 'Fruit', 'Red', 'Fresh Farms', null),
('Banana', 120, 0.30, 'Fruit', 'Yellow', 'Tropical Bites',null),
('Carrot', 80, 0.20, 'Vegetable', 'Orange', 'Nature''s Own', null),
('Broccoli', 50, 1.25, 'Vegetable', 'Green', 'Green Valley', null),
('Chicken Breast', 40, 3.75, 'Meat', 'White', 'Farm Fresh', null),
('Salmon', 30, 8.99, 'Seafood', 'Pink', 'Ocean Catch', null),
('Eggs', 200, 0.15, 'Dairy', 'White', 'Happy Hens', null),
('Milk', 60, 1.99, 'Dairy', 'White', 'Dairy Pure', null),
('Bread', 70, 1.50, 'Bakery', 'Brown', 'Bakery Delights', null),
('Rice', 90, 0.75, 'Grains', 'White', 'Golden Harvest', null),
('Pasta', 55, 1.00, 'Grains', 'Yellow', 'Pasta Palace', null),
('Cheese', 40, 2.50, 'Dairy', 'Yellow', 'Cheesy Goodness', null),
('Yogurt', 60, 1.25, 'Dairy', 'White', 'Yummy Yogurt', null),
('Butter', 70, 2.99, 'Dairy', 'Yellow', 'Creamy Bliss', null),
('Oranges', 110, 0.40, 'Fruit', 'Orange', 'Citrus World', null),
('Grapes', 90, 2.00, 'Fruit', 'Purple', 'Vine Valley', null),
('Watermelon', 25, 4.50, 'Fruit', 'Green', 'Sweet Melons', null),
('Tomato', 85, 0.60, 'Vegetable', 'Red', 'Farm Fresh', null),
('Potato', 100, 0.20, 'Vegetable', 'Brown', 'Spud Harvest', null),
('Onion', 95, 0.30, 'Vegetable', 'White', 'Nature''s Own', null),
('Bell Pepper', 70, 0.75, 'Vegetable', 'Red', 'Green Valley', null),
('Spinach', 60, 1.50, 'Vegetable', 'Green', 'Fresh Greens', null),
('Ground Beef', 35, 5.99, 'Meat', 'Red', 'Farm Fresh', null),
('Shrimp', 40, 9.99, 'Seafood', 'Pink', 'Ocean Catch', null),
('Tuna', 45, 2.50, 'Seafood', 'Gray', 'Fishy Foods', null),
('Lettuce', 100, 0.75, 'Vegetable', 'Green', 'Leafy Greens', null),
('Cucumber', 80, 0.50, 'Vegetable', 'Green', 'Cool Crunch', null),
('Strawberries', 65, 3.25, 'Fruit', 'Red', 'Berry Patch', null),
('Blueberries', 70, 3.50, 'Fruit', 'Blue', 'Berry Patch', null),
('Mango', 55, 1.75, 'Fruit', 'Yellow', 'Tropical Treats', null),
('Avocado', 60, 1.25, 'Fruit', 'Green', 'Green Goodness', null),
('Almonds', 45, 4.50, 'Nuts', 'Brown', 'Nutty Farms', null),
('Walnuts', 30, 5.25, 'Nuts', 'Brown', 'Nutty Farms', null),
('Cashews', 40, 6.00, 'Nuts', 'Yellow', 'Crunchy Snacks', null),
('Orange Juice', 75, 2.99, 'Beverages', 'Orange', 'Juicy Drinks', null),
('Apple Juice', 80, 2.50, 'Beverages', 'Yellow', 'Juicy Drinks', null),
('Soda', 150, 1.25, 'Beverages', 'Brown', 'Fizzy Pop', null),
('Coffee', 100, 7.99, 'Beverages', 'Brown', 'Brewed Bliss', null),
('Tea', 90, 4.99, 'Beverages', 'Green', 'Tea Time', null),
('Chips', 120, 1.75, 'Snacks', 'Yellow', 'Crunchy Treats', null),
('Cookies', 85, 2.25, 'Snacks', 'Brown', 'Sweet Bites', null),
('Chocolate', 100, 1.50, 'Snacks', 'Brown', 'Choco Delight', null),
('Ice Cream', 60, 3.99, 'Frozen', 'White', 'Cool Treats', null),
('Frozen Pizza', 40, 5.99, 'Frozen', 'Various', 'Easy Meals', null),
('Ketchup', 70, 1.50, 'Condiments', 'Red', 'Saucy Stuff', null),
('Mustard', 65, 1.25, 'Condiments', 'Yellow', 'Saucy Stuff', null),
('Mayonnaise', 50, 2.99, 'Condiments', 'White', 'Creamy Goodness', null),
('Olive Oil', 45, 6.50, 'Pantry', 'Yellow', 'Golden Pressed', null),
('Vinegar', 50, 1.99, 'Pantry', 'Clear', 'Tangy Flavors', null),
('Sugar', 90, 2.00, 'Pantry', 'White', 'Sweet Essentials', null),
('Salt', 100, 0.99, 'Pantry', 'White', 'Basic Seasonings', null);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query(createSQLTable);
    console.log("Table created.");
    await client.query(createSQLData);
    console.log("Data created.");
  } catch (error) {
    console.error("Error occured:", error);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
