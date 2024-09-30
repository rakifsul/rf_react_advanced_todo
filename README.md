# rf_react_advanced_todo - Todo App Written In Node JS and React

[README dengan Bahasa Indonesia Klik di Sini](https://github.com/rakifsul/rf_react_advanced_todo/blob/main/README_id.md)

## What is This Software?

rf_react_advanced_todo is a todo app built with Node.js, React, Redux, Redux Toolkit, Context, Bootstrap, and Axios.

The client uses Redux, Redux Toolkit, and Context, each separately.

The server uses Mongoose and Knex.

## How It Works

This application functions like a typical CRUD.

The difference is, it is a Single Page App (SPA) that also uses React.

So there are no page refreshes.

The application is divided into a client and a server.

The client uses React.

The server uses Node.js.

## How to Try the Server Code

### How to Try server-mongoose Code

To try the server-mongoose code, navigate to the server-mongoose folder via the command line.

Next, create a .env file inside the folder...

Then, configure the database settings and other configurations in the .env file based on .env-example.

The server-mongoose code requires MongoDB, so make sure you have installed it and created the database as per the previous configuration.

Make sure port 3001 is not in use.

To run it:

```
npm install
```

```
npm start
```

Or:

```
npm install
```

```
npm run dev
```

### How to Try server-knex Code

To try the server-knex code, create a .env file inside the folder.

Then, fill in the .env file based on .env-example. Here you can change the port, environment, and database details.

The server-knex code requires MySQL, so make sure you have installed it and created the database according to the configuration.

Now, make sure you are inside the server-knex folder.

Next, run:

```
npm install
```

Then, run:

```
npm run db:refresh
```

Then, run:

```
npm run dev
```

Or:

```
npm start
```

## How to Try the Client Code

Make sure port 3000 is not in use.

Enter one of the client-* folders.

To run it:

```
npm install
```

```
npm start
```

## Freelance Worker Link

- https://projects.co.id/public/browse_users/view/99bc11/rakifsul