const Item = require("../models/itemModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      status: "success",
      results: items.length,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFilteredItems = async (req, res) => {
  try {
    const { category, price } = req.query;

    let categoryQuery;
    // if category === "all" to [{ category: "smartphones" },{ category: "laptops" },{ category: "fragrances" },{ category: "skincare" },{ category: "groceries" }]
    if (category === "all") {
      categoryQuery = [
        { category: "smartphones" },
        { category: "laptops" },
        { category: "fragrances" },
        { category: "skincare" },
        { category: "groceries" },
      ];
      // "smartphones,laptops" to [{category: "smartphones"}, {category: "laptops"}]
    } else {
      categoryQuery = category.split(",").map((el) => {
        return { category: el };
      });
    }

    const priceQuery = { ...price };
    // if { gte: 'null', lte: 'null' } then exclude priceQuery
    if (Object.values(priceQuery).includes("null")) {
      queryObj = { $or: categoryQuery };
      // { gte: '500', lte: '2000' } to { $gte: 500, $lte: 2000 }
    } else {
      for (const key in priceQuery) {
        const newKey = "$" + key;
        priceQuery[newKey] = +priceQuery[key];
        delete priceQuery[key];
      }
      queryObj = { $or: categoryQuery, price: priceQuery };
    }

    const items = await Item.aggregate([
      {
        $match: queryObj,
      },
    ]);
    res.status(200).json({
      status: "success",
      results: items.length,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
