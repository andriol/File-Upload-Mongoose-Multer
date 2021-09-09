const multer = require("multer");
const express = require("express");
require("../images-upload/db/mongoose");
const sharp = require("sharp");
const Image = require("../images-upload/models/image");

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({
  //dest: "public/images",
  limits: {
    fileSize: 10000000,
  },
});
app.post(
  "/profile/avatar",
  upload.single("avatar"),
  async (req, res) => {
    const image = new Image({ avatar: req.file.buffer });
    image.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    image.avatar = buffer;
    await image.save();
    res.status(201).send("successful");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.get("/profile/avatar/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpeg");
    res.send(image.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
