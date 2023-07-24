const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

// use express.json() to get data in json format
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initializing port
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_CONNECT || "mongodb://0.0.0.0:27017/";

// allow ports to perform operations
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// let import the routes
const authRoute = require("./routes/auth");
const countryRoute =  require("./routes/countryData");

// Lets connect to monogoDB...
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
  .then(() => console.log("Connected to DataBase..."))
  .catch((err) => console.log(err));

// use the routes
app.use("/api/auth", authRoute);
app.use("/api/countryData", countryRoute);

// Add port and connect to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
