require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = () => {
  const MongoDB_URL = process.env.MongoDB_URL;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Successfully connected to the database!`);
    })
    .catch((error) => console.log(`Error in connecting to the database, Error : ${error}`));
};

module.exports={connectDB};
