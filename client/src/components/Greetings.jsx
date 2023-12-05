import React from "react";

function GreetingMessage() {
    const getCurrentHour = () => new Date().getHours();

    const getGreetingMessage = (hour) => {
        if (hour >= 5 && hour < 12) {
            return "Good morning!";
        } else if (hour >= 12 && hour < 18) {
            return "Good afternoon!";
        } else {
            return "Good evening!";
        }
    };

    const currentHour = getCurrentHour();
    const greetingMessage = getGreetingMessage(currentHour);

    return (
        <div>
            <h3>{greetingMessage}</h3>
        </div>
    );
}

export default GreetingMessage;
