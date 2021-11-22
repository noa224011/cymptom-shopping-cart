const express = require("express");
var cors = require("cors");
const app = express();
const morgan = require("morgan");
const autocompleteRoutes = require("./api/routes/autocomplete");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/autocomplete", autocompleteRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
