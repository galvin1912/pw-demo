const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/task", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "task.html"));
});

app.listen(8080, () => {
  console.log("Server successfully running on port 8080");
});
