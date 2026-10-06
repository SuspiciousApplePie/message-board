import express from "express";
import process from "node:process";
import path from "node:path";
import { NotFoundError } from "./error/error.js";

import messageApp from "./routes/messagesRoute.js";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/", messageApp);

app.use((req, res, next) => {
  next(new NotFoundError("Page not found"));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`); // eslint-disable-line no-console
});
