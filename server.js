const express = require("express");

const app = express();

app.get("/api/info", (req, res) => {
  res.json({
    name: "yxb",
  });
});

app.listen(8079);
