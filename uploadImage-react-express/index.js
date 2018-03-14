const express = require("express");

const app = express();
const path = require("path");

const routes = require("./server/router");

app.use(express.static(path.join(__dirname, "client/build")));
routes(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(process.env.PORT || 8000);
