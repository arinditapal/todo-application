const express = require("express");
const apiRouter  = require("./routers/apiRouter");


const app = express();
const PORT = 3000;


app.use("/", express.static("public"));

app.use(express.json());

app.use( "/api/todos", apiRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
})

async function main() {
    app.listen(PORT, () => {
        console.log("⚡ Todo App Server");
        console.log(`⚡ Server running at http://127.0.0.1:${PORT}`);
    });
}

main().catch((err) => console.error(err));



// GET /api/todos - get todos
// GET /api/todos/{id} - get particular todo
// POST /api/todos - Add data
// PATCH /api/todos/{id} - update a particular todo
// DELETE /api/todos/{id} - delete a particular todo

// TODO:
// - use js array built-in findIndex method. done
// - verify the input given: id in url, and body done
// - proper error handling, return proper status code and message done
// - update todo handler, able to update title and completed field done

// TODO:
// 1. zod validation in all the api routes where data received from user.
// 2. put database queries in separate functions in different model file.
// 3. fetch data in route from the database for all the routes.


// TODO:
// - ORM
// - dockerize
// - simple diployment
// to get ⚡emoji's press window + .