const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

/* middleware */

// This middleware enables Cross-Origin Resource Sharing (CORS) for your Express application.
app.use(cors());
// This middleware parses incoming requests with JSON payloads and makes the data available on the req.body object.
app.use(express.json()); // req.body

/* TODO */

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1)",
            [description]
        );

        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
});
// get all todos

// get a todo

// update a todo

// delete a todo

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
