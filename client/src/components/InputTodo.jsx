import { styled, useTheme, createTheme, ThemeProvider } from "@mui/system";
import { useState } from "react";

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#50914a",
            dark: "#004080",
        },
        secondary: {
            main: "#FF4081",
            dark: "#C51162",
        },
    },
});

const MyInputTodo = styled("div")(({ theme }) => ({
    maxWidth: "100%",
    color: "darkslategray",
    border: "2px solid #eee",
    borderRadius: 12,
    padding: "1em",
    fontFamily: "cursive, Arial",

    // [theme.breakpoints.up("sm")]: {
    //     maxWidth: "100%",
    // },
}));

const MyHeader = styled("h1")({});

const MyForm = styled("form")({
    display: "flex",
    flexDirection: "column",
});

const MyInput = styled("input")(({ theme }) => ({
    padding: "1rem",
    height: "60px",
    overflow: "scroll",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.5",
    letterSpacing: "1.5px",
}));

const MyButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            setDescription("");
            window.location = "/";
        } catch (error) {
            console.log(error);
        }
    };

    const theme = useTheme();
    return (
        <ThemeProvider theme={customTheme}>
            <MyInputTodo>
                <MyHeader />
                <MyForm onSubmit={onSubmitForm}>
                    <MyInput
                        placeholder="todo"
                        type="text"
                        theme={theme}
                        value={description}
                        onChange={handleDescription}
                    />
                    <MyButton disabled={!description}>Add</MyButton>
                </MyForm>
            </MyInputTodo>
        </ThemeProvider>
    );
};

export default InputTodo;
