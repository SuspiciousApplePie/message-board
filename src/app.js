import express from "express";
import process from "node:process";
import path from "node:path";

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

app.post("/new", (req, res) => {
  messages.push(newMessage(req.body.name, req.body.message));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

function newMessage(user, text) {
  return { user, text, added: new Date() };
}
