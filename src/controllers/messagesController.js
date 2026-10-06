import { getAllMessages, getMessageById, postMessage } from "../db/queries.js";
import { NotFoundError, formError } from "../error/error.js";
import { body, matchedData, validationResult } from "express-validator";
import { formatDistanceToNow } from "date-fns";

const navBar = [
  { name: "Home", link: "/" },
  { name: "New Message", link: "/new" },
];

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage(formError("Name", "must contain at least two characters.")),
  body("message")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(formError("Message", "must contain at least one character.")),
];

async function getMessages(req, res) {
  const messages = await getAllMessages();
  res.render("index", {
    messages: messages,
    title: "Message app",
    navBar: navBar,
    formatDistanceToNow: formatDistanceToNow,
  });
}

function getMessageForm(req, res) {
  res.render("form", { title: "Send a message", navBar: navBar });
}

async function getSelectedMessage(req, res, next) {
  const id = req.params.msgId;
  const [message] = await getMessageById(id);

  if (message) {
    res.render("messageInfo", {
      message: message,
      navBar: navBar,
      formatDistanceToNow: formatDistanceToNow,
    });
  } else {
    next(new NotFoundError("Message not found."));
  }
}

const postNewMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Send a message",
        navBar: navBar,
        errors: errors.array(),
      });
    }

    try {
      const { name, message } = matchedData(req);
      await postMessage({ name, message });
    } catch (error) {
      next(error);
    }
    res.redirect("/");
  },
];

export { getMessages, getMessageForm, getSelectedMessage, postNewMessage };
