const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("../models/itemModel");

dotenv.config({ path: "./config.env" });

// Clean data from items.json and save it to itemsSimple.json
// const items = JSON.parse(fs.readFileSync("./dev-data/items.json", "utf-8"));

// const excludedFields = ["id", "discountPercentage", "brand", "images"];

// items.forEach((item, index) => {
//   excludedFields.forEach((field) => delete item[field]);
//   // "https://i.dummyjson.com/data/products/5/thumbnail.jpg" to "/thumbnail5.jpg"
//   item.thumbnail = `/thumbnail${index + 1}.${item.thumbnail.split(".")[3]}`;
//   item.availableStock = item.stock;
// });

// fs.writeFileSync("./dev-data/itemsSimple.json", JSON.stringify(items));

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

const itemsSimple = fs.readFileSync("./dev-data/itemsSimple.json", "utf-8");

const insertData = async () => {
  try {
    await Item.create(JSON.parse(itemsSimple));
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Item.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--insert") {
  insertData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
