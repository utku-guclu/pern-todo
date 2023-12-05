const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

/* middlewares */

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
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
            id,
        ]);
        res.json(todo.rows[0]);
    } catch (error) {}
});

// update a todo description
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, isCrossedOut } = req.body;
        if (description) {
            const updateTodo = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description, id]
            );
        }
        if (isCrossedOut) {
            const updateTodo = await pool.query(
                "UPDATE todo SET is_crossed_out = $1 WHERE todo_id = $2",
                [isCrossedOut, id]
            );
        }
        res.json("todo's description updated!");
    } catch (error) {
        console.log(error);
    }
});

// update a todo status
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { isCrossedOut } = req.body;
//         const updateTodo = await pool.query(
//             "UPDATE todo SET is_crossed_out = $1 WHERE todo_id = $2",
//             [isCrossedOut, id]
//         );
//         res.json("todo's status updated!");
//     } catch (error) {
//         console.log(error);
//     }
// });

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id=$1",
            [id]
        );
        res.json("todo's deleted!");
    } catch (error) {
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
