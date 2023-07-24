const mongoose = require("mongoose");

exports.ConnectionMongo = () => {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/QXTRANSITO", {})
      .then(() => {
        console.log("Connection to MongoDB established");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
