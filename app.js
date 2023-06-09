const express = require("express");
const cors = require("cors");
const itemRouter = require("./routes/itemsRoutes");
const cartRouter = require("./routes/cartRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("./public/images"));

app.use("/api/v1/items", itemRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot access ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
