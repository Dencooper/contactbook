const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contact.route");
const ApiError = require("./api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource Not found"));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

module.exports = app;   