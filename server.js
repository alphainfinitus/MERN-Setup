const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

//Connect to MongoDB with mongoose
const db = config.get("mongoURI");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

const app = express();

//Listen to PORT
app.listen(port, () => console.log(`Server started on port ${port}`));

// Body Parser Middleware
app.use(express.json());

//Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
