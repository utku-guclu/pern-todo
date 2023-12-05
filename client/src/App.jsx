import { useEffect, useState, Fragment } from "react";
import "./App.css";

import { Box, styled } from "@mui/material";

import { getJoke } from "./api/ai";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import Timer from "./components/Timer";
import GreetingMessage from "./components/Greetings";

const MyBox = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2em",

    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
    },
}));

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
            <Box>
                {greet || <GreetingMessage />}
                <Timer />
            </Box>
            <MyBox>
                <InputTodo />
                <ListTodos />
            </MyBox>
        </Fragment>
    );
}

export default App;
