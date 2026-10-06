import pool from "./pool.js";

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    id,
  ]);

  return rows;
}

async function postMessage(message) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
    message.name,
    message.message,
  ]);
}

export { getAllMessages, getMessageById, postMessage };
