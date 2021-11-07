require("dotenv").config();
const express = require("express");

const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");
const { connection } = require("./config/db");
const errorHandler = require("./middleware/error");

const app = express();

connection(process.env.MONGO_URI);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/private", privateRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
