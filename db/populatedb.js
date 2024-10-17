const { Client } = require("pg");

const createSQLTable = `CREATE TABLE IF NOT EXISTS inventory ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(50) UNIQUE, quantity INTEGER, price DECIMAL(5, 2), category VARCHAR(50), color VARCHAR(30), brand VARCHAR(50), src TEXT DEFAULT '/images/fork-knife-default.svg', description VARCHAR(200));`;

const createSQLData = `
INSERT INTO inventory (name, quantity, price, category, color, brand, src, description) VALUES
	('Apple', 100, 0.50, 'Fruit', 'Red', 'Fresh Farms', '/images/apple.svg', 'A crisp and juicy red apple, perfect for snacking or adding to salads.'),
	('Banana', 120, 0.30, 'Fruit', 'Yellow', 'Tropical Bites', '/images/banana.svg', 'A ripe and sweet banana, ideal for smoothies or as a healthy snack.'),
	('Carrot', 80, 0.20, 'Vegetable', 'Orange', 'Nature''s Own', '/images/carrot.svg', 'Fresh orange carrots, great for cooking or munching raw.'),
	('Broccoli', 50, 1.25, 'Vegetable', 'Green', 'Green Valley', '/images/broccoli.svg', 'A bunch of fresh broccoli florets, perfect for steaming or roasting.'),
	('Salmon', 30, 8.99, 'Seafood', 'Pink', 'Ocean Catch', '/images/salmon.svg', 'Premium quality salmon fillets, rich in omega-3 fatty acids.'),
	('Eggs', 200, 0.15, 'Dairy', 'White', 'Happy Hens', '/images/egg.svg', 'Farm-fresh eggs, ideal for breakfast or baking.'),
	('Milk', 60, 1.99, 'Dairy', 'White', 'Dairy Pure', '/images/milk.svg', 'Fresh dairy milk, perfect for drinking or adding to cereal.'),
	('Bread', 70, 1.50, 'Bakery', 'Brown', 'Bakery Delights', '/images/bread.svg', 'Soft and wholesome whole grain bread, freshly baked.'),
	('Pasta', 55, 1.00, 'Grains', 'Yellow', 'Pasta Palace', '/images/pasta.svg', 'Classic spaghetti pasta, great for Italian dishes.'),
	('Cheese', 40, 2.50, 'Dairy', 'Yellow', 'Cheesy Goodness', '/images/cheese.svg', 'Delicious cheddar cheese, perfect for sandwiches or melting.'),
	('Butter', 70, 2.99, 'Dairy', 'Yellow', 'Creamy Bliss', '/images/butter.svg', 'Rich and creamy butter, perfect for spreading or baking.'),
	('Oranges', 110, 0.40, 'Fruit', 'Orange', 'Citrus World', '/images/orange.svg', 'Juicy and sweet oranges, great for fresh juice or snacking.'),
	('Grapes', 90, 2.00, 'Fruit', 'Purple', 'Vine Valley', '/images/grapes.svg', 'Fresh purple grapes, perfect for snacking or adding to salads.'),
	('Watermelon', 25, 4.50, 'Fruit', 'Green', 'Sweet Melons', '/images/watermelon.svg', 'A large, sweet watermelon, perfect for a refreshing summer treat.'),
	('Tomato', 85, 0.60, 'Vegetable', 'Red', 'Farm Fresh', '/images/tomato.svg', 'Fresh, ripe tomatoes, perfect for salads or cooking.'),
	('Potato', 100, 0.20, 'Vegetable', 'Brown', 'Spud Harvest', '/images/potato.svg', 'Fresh potatoes, perfect for mashing, baking, or frying.'),
	('Onion', 95, 0.30, 'Vegetable', 'White', 'Nature''s Own', '/images/onion.svg', 'Crisp and flavorful onions, great for cooking or salads.'),
	('Shrimp', 40, 9.99, 'Seafood', 'Pink', 'Ocean Catch', '/images/shrimp.svg', 'Fresh shrimp, perfect for grilling or adding to pasta dishes.'),
	('Lettuce', 100, 0.75, 'Vegetable', 'Green', 'Leafy Greens', '/images/lettuce.svg', 'Crisp and fresh lettuce, perfect for salads and sandwiches.'),
	('Cucumber', 80, 0.50, 'Vegetable', 'Green', 'Cool Crunch', '/images/cucumber.svg', 'Crisp cucumbers, great for salads or snacking.'),
	('Strawberries', 65, 3.25, 'Fruit', 'Red', 'Berry Patch', '/images/strawberry.svg', 'Fresh and sweet strawberries, perfect for desserts or snacking.'),
	('Blueberries', 70, 3.50, 'Fruit', 'Blue', 'Berry Patch', '/images/blueberries.svg', 'Plump and juicy blueberries, great for baking or snacking.'),
	('Avocado', 60, 1.25, 'Fruit', 'Green', 'Green Goodness', '/images/avocado.svg', 'Creamy avocados, ideal for guacamole or adding to salads.'),
	('Orange Juice', 75, 2.99, 'Beverages', 'Orange', 'Juicy Drinks', '/images/orangejuice.svg', 'Freshly squeezed orange juice, packed with vitamin C.'),
	('Apple Juice', 80, 2.50, 'Beverages', 'Yellow', 'Juicy Drinks', '/images/applejuice.svg', 'Delicious apple juice, perfect for breakfast or a refreshing drink.'),
	('Soda', 150, 1.25, 'Beverages', 'Brown', 'Fizzy Pop', '/images/soda.svg', 'A refreshing, fizzy soda to quench your thirst.'),
	('Coffee', 100, 7.99, 'Beverages', 'Brown', 'Brewed Bliss', '/images/coffee.svg', 'Rich and aromatic coffee beans, perfect for a morning brew.'),
	('Tea', 90, 4.99, 'Beverages', 'Green', 'Tea Time', '/images/tea.svg', 'Premium tea leaves, perfect for a soothing cup of tea.'),
	('Cookies', 85, 2.25, 'Snacks', 'Brown', 'Sweet Bites', '/images/cookies.svg', 'Delicious homemade cookies, perfect for a sweet snack.'),
	('Chocolate', 100, 1.50, 'Snacks', 'Brown', 'Choco Delight', '/images/chocolate.svg', 'Rich and smooth chocolate, perfect for a sweet treat.'),
	('Ice Cream', 60, 3.99, 'Frozen', 'White', 'Cool Treats', '/images/icecream.svg', 'Creamy ice cream, perfect for dessert or a summer treat.'),
	('Frozen Pizza', 40, 5.99, 'Frozen', 'Various', 'Easy Meals', '/images/pizza.svg', 'A frozen pizza, easy and quick to prepare for dinner.'),
	('Ketchup', 70, 1.50, 'Condiments', 'Red', 'Saucy Stuff', '/images/ketchup.svg', 'Classic ketchup, perfect for burgers or fries.'),
	('Mustard', 65, 1.25, 'Condiments', 'Yellow', 'Saucy Stuff', '/images/mustard.svg', 'Tangy mustard, perfect for hot dogs and sandwiches.'),
	('Olive Oil', 45, 6.50, 'Pantry', 'Yellow', 'Golden Pressed', '/images/olive-oil.svg', 'Extra virgin olive oil, great for cooking or salad dressings.'),
	('Sugar', 90, 2.00, 'Pantry', 'White', 'Sweet Essentials', '/images/sugar.svg', 'Granulated sugar, perfect for baking or sweetening drinks.'),
	('Salt', 100, 0.99, 'Pantry', 'White', 'Basic Seasonings', '/images/salt.svg', 'Classic table salt, essential for seasoning your meals.')
ON CONFLICT (name) DO NOTHING;
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
