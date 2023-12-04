import { useEffect, useState } from "react";
import "./App.css";

import { getJoke } from "./api/ai";

function App() {
    const [greet, setGreet] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const joke = await getJoke();
            setGreet(joke);
        };
        fetchData();
    }, []);

    return <>{greet || "Welcome!"}</>;
}

export default App;
