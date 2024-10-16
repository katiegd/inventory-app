const { Client } = require("pg");

const createSQLTable = `CREATE TABLE IF NOT EXISTS inventory ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(50), quantity INTEGER, price DECIMAL(5, 2), category VARCHAR(50), color VARCHAR(30), brand VARCHAR(50), src TEXT DEFAULT '/images/fork-knife-default.svg');`;

const createSQLData = `
INSERT INTO inventory (name,quantity,price,category,color,brand,src) VALUES
	 ('Apple',100,0.50,'Fruit','Red','Fresh Farms','/images/apple.svg'),
	 ('Banana',120,0.30,'Fruit','Yellow','Tropical Bites','/images/banana.svg'),
	 ('Carrot',80,0.20,'Vegetable','Orange','Nature''s Own','/images/carrot.svg'),
	 ('Broccoli',50,1.25,'Vegetable','Green','Green Valley','/images/broccoli.svg'),
	 ('Salmon',30,8.99,'Seafood','Pink','Ocean Catch','/images/salmon.svg'),
	 ('Eggs',200,0.15,'Dairy','White','Happy Hens','/images/egg.svg'),
	 ('Milk',60,1.99,'Dairy','White','Dairy Pure','/images/milk.svg'),
	 ('Bread',70,1.50,'Bakery','Brown','Bakery Delights','/images/bread.svg'),
	 ('Pasta',55,1.00,'Grains','Yellow','Pasta Palace','/images/pasta.svg'),
	 ('Cheese',40,2.50,'Dairy','Yellow','Cheesy Goodness','/images/cheese.svg');
	 ('Butter',70,2.99,'Dairy','Yellow','Creamy Bliss','/images/butter.svg'),
	 ('Oranges',110,0.40,'Fruit','Orange','Citrus World','/images/orange.svg'),
	 ('Grapes',90,2.00,'Fruit','Purple','Vine Valley','/images/grapes.svg'),
	 ('Watermelon',25,4.50,'Fruit','Green','Sweet Melons','/images/watermelon.svg'),
	 ('Tomato',85,0.60,'Vegetable','Red','Farm Fresh','/images/tomato.svg'),
	 ('Potato',100,0.20,'Vegetable','Brown','Spud Harvest','/images/potato.svg'),
	 ('Onion',95,0.30,'Vegetable','White','Nature''s Own','/images/onion.svg'),
	 ('Shrimp',40,9.99,'Seafood','Pink','Ocean Catch','/images/shrimp.svg'),
	 ('Lettuce',100,0.75,'Vegetable','Green','Leafy Greens','/images/lettuce.svg'),
	 ('Cucumber',80,0.50,'Vegetable','Green','Cool Crunch','/images/cucumber.svg');
	 ('Strawberries',65,3.25,'Fruit','Red','Berry Patch','/images/strawberry.svg'),
	 ('Blueberries',70,3.50,'Fruit','Blue','Berry Patch','/images/blueberries.svg'),
	 ('Avocado',60,1.25,'Fruit','Green','Green Goodness','/images/avocado.svg'),
	 ('Orange Juice',75,2.99,'Beverages','Orange','Juicy Drinks','/images/orangejuice.svg'),
	 ('Apple Juice',80,2.50,'Beverages','Yellow','Juicy Drinks','/images/applejuice.svg'),
	 ('Soda',150,1.25,'Beverages','Brown','Fizzy Pop','/images/soda.svg'),
	 ('Coffee',100,7.99,'Beverages','Brown','Brewed Bliss','/images/coffee.svg'),
	 ('Tea',90,4.99,'Beverages','Green','Tea Time','/images/tea.svg'),
	 ('Cookies',85,2.25,'Snacks','Brown','Sweet Bites','/images/cookies.svg'),
	 ('Chocolate',100,1.50,'Snacks','Brown','Choco Delight','/images/chocolate.svg');
	 ('Ice Cream',60,3.99,'Frozen','White','Cool Treats','/images/icecream.svg'),
	 ('Frozen Pizza',40,5.99,'Frozen','Various','Easy Meals','/images/pizza.svg'),
	 ('Ketchup',70,1.50,'Condiments','Red','Saucy Stuff','/images/ketchup.svg'),
	 ('Mustard',65,1.25,'Condiments','Yellow','Saucy Stuff','/images/mustard.svg'),
	 ('Olive Oil',45,6.50,'Pantry','Yellow','Golden Pressed','/images/olive-oil.svg'),
	 ('Sugar',90,2.00,'Pantry','White','Sweet Essentials','/images/sugar.svg'),
	 ('Salt',100,0.99,'Pantry','White','Basic Seasonings','/images/salt.svg');
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
