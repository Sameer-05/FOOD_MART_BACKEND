const mongoose = require("mongoose");

const mongouri = "mongodb+srv://sameerkumar:Sah54321@cluster0.0vgo5tq.mongodb.net/FOODMART?retryWrites=true&w=majority";

const checkMongoDBConnection = async () => {
  try {
    await mongoose.connect(mongouri, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    // Perform additional actions after successful connection
    const foodItemsCollection = mongoose.connection.db.collection("FOOD_ITEM");
    const foodItems = await foodItemsCollection.find({}).toArray();

    global.FOOD_ITEM = foodItems;
    // console.log(global.FOOD_ITEM);
    const foodCategoryCollection = mongoose.connection.db.collection("FOOD_CATEGORY");
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    global.food_category = foodCategory;
    // console.log(global.food_category)
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

checkMongoDBConnection();
