const mongoose = require("mongoose");

exports.connection = async (URI) => {
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
