import { useEffect, useState } from "react";

function Timer() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // empty dependency array ensures the effect runs only once when the component mounts

    // Format the time for display
    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div>
            <h2>{formattedTime}</h2>
        </div>
    );
}

export default Timer;
