import express from "express";
import process from "node:process";
import path from "node:path";
import NotFoundError from "./error/error.js";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3010;

const messages = [
  {
    text: "Hi there!",
    user: "Yukino",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charlotte",
    added: new Date(),
  },
];

const navBar = [
  { name: "Home", link: "/" },
  { name: "New Message", link: "/new" },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Message Board",
    messages: messages,
    navBar: navBar,
  });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "Send a message", navBar: navBar });
});

app.get("/message/:msgId", (req, res, next) => {
  const message = messages.find(
    (msg, index) => Number(req.params.msgId) === index,
  );

  if (message) {
    res.render("messageInfo", { message: message, navBar: navBar });
  } else {
    next(new NotFoundError("Page not found"));
  }
});

app.post("/new", (req, res) => {
  messages.push(newMessage(req.body.name, req.body.message));
  res.redirect("/");
});

app.use((err, req, res, next) => {
  res.status(404).send(err);
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

function newMessage(user, text) {
  return { user, text, added: new Date() };
}
