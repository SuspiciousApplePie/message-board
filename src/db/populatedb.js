import { Client } from "pg";
import process from "node:process";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    text VARCHAR ( 255 ),
    added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text) 
VALUES
    ('Yukino', 'Hi There!'),
    ('Charlotte', 'Hello World!');
`;

async function main() {
  console.log("...seeding"); // eslint-disable-line no-console
  const client = new Client({
    connectionString: process.argv[2],
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("Done"); // eslint-disable-line no-console
}

main();
