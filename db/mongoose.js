const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/images", {
  useNewUrlParser: true,
  //autoIndex: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
