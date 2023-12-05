import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const TodoTable = ({ todos, handleDelete, handleEdit }) => {
    // console.log(todos);
    const rows = todos.map((item) => ({
        id: item.todo_id,
        todo: item.description,
        isCrossed: item.is_crossed_out,
    }));

    const columns = [
        {
            field: "todo",
            editable: true,
            headerName: "Todo",
            description: "This column has a value getter and is not sortable.",
            sortable: true,
            width: 260,
            valueGetter: (params) => `${params.row.todo || ""}`,
            cellClassName: (params) => {
                //  console.log(params.row.isCrossed);
                return `${params.row.isCrossed ? "crossed-out" : ""}`;
            },
            //
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            renderCell: (params) => (
                <button style={{ background: "#3b82b2" }}>Update</button>
            ),
        },
        {
            field: "delete",
            headerName: "",
            width: 100,
            renderCell: (params) => (
                <button style={{ background: "#c54c4c" }}>Delete</button>
            ),
        },
    ];

    return (
        <DataGrid
            autoHeight
            style={{ color: "white" }}
            rows={rows}
            columns={columns}
            onCellDoubleClick={(params) => {
                // if (params.field === "todo") {
                //     handleCross(params.id);
                // }
            }}
            onCellClick={(params) => {
                if (params.field === "delete") {
                    if (
                        window.confirm(
                            "Do you really want to delete todo item?"
                        )
                    ) {
                        handleDelete(params.id);
                    }
                } else if (params.field === "edit") {
                    const textEdited = params.row.todo;
                    handleEdit(params.id, textEdited);
                }
            }}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            localeText={{ noRowsLabel: "Empty" }}
        />
    );
};

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            const data = await response.json();
            // Compare the current data with the new data
            if (JSON.stringify(data) !== JSON.stringify(todos)) {
                setTodos(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const handleCross = (id) => {
    //     try {
    //         const updatedTodos = todos.map((todo) =>
    //             todo.todo_id === id
    //                 ? { ...todo, is_crossed_out: !todo.is_crossed_out }
    //                 : todo
    //         );
    //         setTodos(updatedTodos);

    //         const crossedTodo = updatedTodos.find(
    //             (todo) => todo.todo_id === id
    //         );
    //         const isCrossed = crossedTodo.is_crossed_out;

    //         updateIsCrossedInServer(id, isCrossed);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleEdit = async (id, description) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            });

            alert("updated!");

            if (!response.ok) {
                console.log("Failed to update is_crossed_out in the server");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateIsCrossedInServer = async (id, isCrossed) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCrossedOut: isCrossed }),
            });

            if (!response.ok) {
                console.log("Failed to update is_crossed_out in the server");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const deleteTodo = await fetch(
                `http://localhost:5000/todos/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (deleteTodo.ok) {
                setTodos(todos.filter((todo) => todo.todo_id !== id));
            } else {
                console.log("Failed to delete todo");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, [todos]); // Dependency on 'todos' ensures that this effect runs when 'todos' changes

    return (
        <div style={{ width: "100%" }}>
            <TodoTable
                todos={todos}
                // handleCross={handleCross}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default ListTodos;
