const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  avatar: {
    type: Buffer,
  },
});
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
