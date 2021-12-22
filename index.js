const express = require("express");
const fs = require("fs");
const path = require("path");
const formidable = require("express-formidable");
const app = express();
const port = 3000;

app.use(formidable());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/hello", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/submit", (req, res) => {
  res.send("Hello World!");
  res.on("data", (chunk) => {
    console.log(chunk);
  });
  //   console.log(res);
});

app.post("/submit", (req, res) => {
  const data = JSON.stringify(req.fields);

  fs.readFile(path.join(__dirname, "data.txt"), "UTF8", (err, oldData) => {
    const newData = data + "\n" + oldData;
    fs.writeFile(path.join(__dirname, "data.txt"), newData, () => {
      console.log("saved");
    });
    res.send(newData);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
