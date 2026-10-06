import {
  getMessages,
  getMessageForm,
  getSelectedMessage,
  postNewMessage,
} from "../controllers/messagesController.js";
import { Router } from "express";

const messageApp = Router();

messageApp.get("/", getMessages);
messageApp.get("/new", getMessageForm);
messageApp.get("/message/:msgId", getSelectedMessage);
messageApp.post("/new", postNewMessage);

export default messageApp;
