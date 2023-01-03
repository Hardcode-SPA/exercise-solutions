import React from "react";

// Über die props kommen folgende Daten rein:
// -> cardText: Der textuelle Inhalt der Card
function Card(props) {
    return (
        <div className="card">
            <p className="card-text">{props.cardText}</p>
        </div>
    );
}

export default Card;