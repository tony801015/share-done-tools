const router = require("express").Router();
const multiparty = require("multiparty");
const fs = require("fs");

module.exports = app => {
  app.post("/upload", (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      const { path: tempPath, originalFilename } = files.imageFile[0];
      const copyToPath = `${__dirname}/images/${originalFilename}`;
      console.log(copyToPath);
      fs.readFile(tempPath, (errs, data) => {
        fs.writeFile(copyToPath, data, "binary", error => {
          if (error) {
            res.status(500);
            res.json({ success: false });
          } else {
            res.status(200);
            res.json({ success: true });
          }
        });
      });
    });
  });
};
