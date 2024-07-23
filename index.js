// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
const app = express();

const PORT = 4000;
app.get("/", function (request, response) {
  response.send(" Welcome 🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
