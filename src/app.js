import express from "express";
import process from "node:process";
import path from "node:path";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3010;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
