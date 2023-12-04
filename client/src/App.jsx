import { useEffect, useState, Fragment } from "react";
import "./App.css";

import { Box } from "@mui/material";

import { getJoke } from "./api/ai";

import InputTodo from "./components/InputTodo";

function App() {
    const [greet, setGreet] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const joke = await getJoke();
            setGreet(joke);
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <Box>{greet || "Welcome!"}</Box>
            <Box>
                <InputTodo />
            </Box>
        </Fragment>
    );
}

export default App;
