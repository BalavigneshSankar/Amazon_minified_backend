const Item = require("../models/itemModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find();
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

exports.getFilteredItems = catchAsync(async (req, res, next) => {
  const { category, price } = req.query;

  const categoryQuery = category.split(",").map((el) => {
    return { category: el };
  });

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
});
