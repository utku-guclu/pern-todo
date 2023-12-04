import { styled, useTheme, createTheme, ThemeProvider } from "@mui/system";

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#1976D2",
            dark: "#004080",
        },
        secondary: {
            main: "#FF4081",
            dark: "#C51162",
        },
    },
});

const MyInputTodo = styled("div")(({ theme }) => ({
    width: "100%", // Default width for all screen sizes
    height: "400px",
    color: "darkslategray",
    border: "2px solid #eee",
    borderRadius: 12,
    padding: "1em",
    fontFamily: "cursive, Arial",

    [theme.breakpoints.up("sm")]: {
        maxWidth: "80%",
    },

    [theme.breakpoints.up("md")]: {
        maxWidth: "100%",
    },

    [theme.breakpoints.up("lg")]: {
        maxWidth: "100%", // Adjusted width for screens equal to or larger than 'lg'
    },
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
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

const InputTodo = () => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={customTheme}>
            <MyInputTodo>
                <MyHeader />
                <MyForm>
                    <MyInput placeholder="todo" type="text" theme={theme} />
                    <MyButton>Add</MyButton>
                </MyForm>
            </MyInputTodo>
        </ThemeProvider>
    );
};

export default InputTodo;
