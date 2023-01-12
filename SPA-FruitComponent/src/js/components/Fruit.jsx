import { useState } from "react";

// Konstantes Array fuer Farben
const COLORS = ['red', 'green', 'yellow', 'blue', 'purple'];


function Fruit({name, deleteCallback}) {
    // Statevariable und Statesetter fuer aktuelle Farbe
    // Initialwert: erste Farbe aus dem konstanten Array
    let [color, setColor] = useState(COLORS[0]);

    // Clickhandler fuer den Change Color Button zum aendern der Farbe
    function handleChangeColor(evt) {
        
        // Der iterative Weg (mit Schleife)
        // let newColor = getRandomColorIterative(color, COLORS);

        // Der rekursive Weg (Funktion ruft sich unter Umstaenden immer wieder selbst auf)
        let newColor = getRandomColorRecursive(color, [...COLORS]);

        // Setze neue Farbe in die Statevariable ein
        setColor(newColor);
    }

    // Clickhandler fuer den Delete Me Button
    function handleDelete(evt) {
        // Rufe Callback zum Loeschen aus den Props auf
        // und uebergebe den Namen der Fruit aus den Props
        deleteCallback(name);
    }

    return (
        <div>
            {name}, color = {color} <button onClick={handleChangeColor}>Change Color</button> <button onClick={handleDelete}>Delete Me</button>
        </div>
    );
}

// Rekursive Hilfsfunktion zum Ermitteln einer neuen Zufallsfarbe
function getRandomColorRecursive(color, colors) {
    // Untergrenze fuer den Index (erster moeglicher Index des Arrays)
    let minIdx = 0;
    // Obergrenze fuer den Index (Laenge des Array der Farben - 1)
    let maxIdx = colors.length-1;

    // Erhalte Random Index zwischen Unter- und Obergrenze
    let randomIdx = Math.round(Math.random() * maxIdx + minIdx);
    // Extrahiere Farbe aus dem Array in den Parametern anhand des Index
    let randomColor = colors[randomIdx];

    // Wenn neue Farbe gleich der bisherigen 
    // -> Rufe dich selbst auf und gebe das Ergebnis des Aufrufs zurueck
    if (randomColor === color) return getRandomColorRecursive(color, [...colors]);
    // Sonst gebe neue Farbe zurueck
    else return randomColor;
}

// Iterative Hilfsfunktion zum Ermitteln einer neuen Zufallsfarbe
function getRandomColorIterative(color, colors) {
    // Untergrenze fuer den Index (erster moeglicher Index des Arrays)
    let minIdx = 0;
    // Obergrenze fuer den Index (Laenge des Array der Farben - 1)
    let maxIdx = colors.length-1;

    // Variable fuer neuen Zufallsindex des Farbenarrays
    let randomIdx;
    // Variable fuer neue Zufallsfarbe
    let randomColor;

    // Fussgesteuerte Schleife, die einen Zufallsindex innerhalb der Grenzen ermittelt
    // und die entsprechende Farbe aus dem uebergebenen Array extrahiert
    // Laeuft solange die neue Farbe gleich der bisherigen Farbe ist
    do {
        randomIdx = Math.round(Math.random() * maxIdx + minIdx);
        randomColor = colors[randomIdx];
    } while (randomColor === color);

    // Gebe neue Farbe zurueck
    return randomColor;
}


export default Fruit;