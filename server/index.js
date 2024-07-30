const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const cookieParser = require("cookie-parser")
require("dotenv").config()
const { app, server } = require("./socket/index")

// const app = express();
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api", router)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(8800, (req, res) => {
      console.log("Connected to MongoDB")
      console.log("server started at port number 8800");
    })
  })