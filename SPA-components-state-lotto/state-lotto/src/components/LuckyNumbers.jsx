import { useEffect, useState } from "react";


function LuckyNumbers(props) {
    // Statevariable für die Zufallszahlen
    const [numbers, setNumbers] = useState([]);

    // Statevariable für die Animationsklasse der Lottokugeln
    const [numberClass, setNumberClass] = useState('');

    // Seiteneffekt, der auf Änderungen der Statevariable numberClass horcht
    useEffect(() => {
        let timeOut = null;
        // Wenn Statevariable auf 'blend-out' steht
        if (numberClass === 'blend-out') {
            // Lösche nach 500ms (halbe Sekunde) Zahlen aus dem State
            timeOut = setTimeout(() => setNumbers([]), 500);
        }

        // Räume Timeout wieder auf, besonders bei schnellen Statewechseln ist das von Vorteil
        return () => clearTimeout(timeOut);
    }, [numberClass]);

    
    const handleReset = evt => {
        // Setze Animationsklasse für das Ausblenden
        setNumberClass('blend-out');
    }

    const handleGenerate = evt => {
        // generiere Zahlen
        let randoms = generateRandomNumbers(6, 1, 49);
        randoms.push(generateRandomNumbers(1, 1, 10));

        // füge Zahlen in State ein
        setNumbers(randoms);

        // Setze Animationsklasse für das Einblenden
        setNumberClass('blend-in');
    }

    // Generiere Lottobälle aus den random Zahlen im State
    let luckyNumbers = numbers.map((number, idx, arr) => {
        // Bestimme CSS Klasse (letzte Zahl ist special)
        // Außerdem Animationsklasse fürs Ein- und Ausblenden
        let className = (idx === arr.length-1) ? `special-number ${numberClass}` : numberClass;

        // Erstelle div und füge Zahl und CSS Klasse ein
        return (
            <div key={idx} className={className}>
                <span>{number}</span>
            </div>
        );
    });

    return (
        <div className="lucky-numbers-container">
            <div className="numbers">
                {luckyNumbers}
            </div>
            <div className="controls">
                <button className="outline-btn" onClick={handleReset}>Reset</button>
                <button className="filled-btn" onClick={handleGenerate}>Show me lucky numbers</button>
            </div>
        </div>
    );
}

// Hilfsfunktion zum Generieren eines Arrays mit einzigartigen Zufallszahlen
// Nimmt als Parameter die Anzahl, die Untergrenze und die Obergrenze
function generateRandomNumbers(count, min, max) {
    // Erstelle neues Set (Menge) für die Zahlen
    // hat den Vorteil, dass Mengen jedes Element nur EINMAL beinhalten können
    let randomNumbers = new Set();

    // Wiederhole solange die Größe des Sets unter der übergebenen Anzahl liegt
    while (randomNumbers.size < count) {
        // Erstelle Zufallszahl innerhalb der übergebenen Grenzen
        let randomNumber = Math.floor(Math.random() * max + min);

        // Versuche generierte Zufallszahl zum Set hinzuzufügen
        // Falls Zahl bereits im Set enthalten, passiert einfach nix
        randomNumbers.add(randomNumber);
    }

    // Gebe ein Array mit den Zahlen aus dem Set als Rückgabewert zurück
    return [...randomNumbers];
}

export default LuckyNumbers;