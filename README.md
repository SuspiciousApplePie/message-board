# Message Board

- Simple message board node js app

## Features

1. Shows message along with user, and date
1. Ability to send message
1. Persistency of messages
1. Validation of form in server

## Tools

1. Express.js
1. EJS (Templating Engine)
1. ESLint
1. Postgres

## File Structure

```
src/
├── app.js
├── controllers
│   └── messagesController.js
├── db
│   ├── pool.js
│   ├── populatedb.js
│   └── queries.js
├── error
│   └── error.js
├── routes
│   └── messagesRoute.js
└── views
    ├── form.ejs
    ├── index.ejs
    ├── message
    │   └── message.ejs
    ├── messageInfo.ejs
    ├── navbar
    │   └── navbar.ejs
    └── partials
        └── errors.ejs
```
