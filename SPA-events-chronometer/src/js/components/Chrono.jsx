import { useEffect, useState } from "react";

// Konstante mit Bedienbuttonnamen
const CONTROLS = {
    start: 'start',
    stop: 'stop',
    reset: 'reset',
    lap: 'lap'
};


function Chrono(props) {
    // Statevariable für das Interval des Timers
    // let [timerInterval, setTimerInteval] = useState(null);

    // Statevariable für den Indikator des Laufens
    let [isRunning, setIsRunning] = useState(false);

    // Statevariable für die verstrichene Zeit des Timers
    let [timer, setTimer] = useState(0);

    // Statevariable für die gestoppten Rundenzeiten
    let [laps, setLaps] = useState([]);

    // Side-Effect für die Veränderung der Statevariable isRunning
    useEffect(() => {
        // Erstellt Intervalvariable
        let interval = null;

        // Wenn Laufindikator positiv
        if (isRunning) {
            // Erstelle neues Interval für den Timer
            interval = setInterval(() => {
                setTimer(timer => timer+10);
            }, 10);
        
        } else {
            // Räume Interval für Timer auf
            clearInterval(interval);
        }

        // Räume zwischen Updates das Interval auf
        return () => clearInterval(interval);
    }, [isRunning]);


    useEffect(() => console.log(laps), [laps]);

    // Handlerfunktion für die drei Bedienungstasten zum Starten, Stoppen und Zurücksetzen des Timers
    function handleControlsClick(evt) {
        switch (evt.target.dataset.control) {
            case CONTROLS.start: 
                console.log('start timer');

                /* clearInterval(timerInterval);
                setTimerInteval(setInterval(() => {
                    setTimer(timer => timer+10);
                }, 10)); */

                // Prüfe, ob bereits läuft und starte nur wenn nicht läuft
                setIsRunning(!isRunning);

                // if (!isRunning) {
                //     setIsRunning(true);
                // }

                break;

            case CONTROLS.stop:
                console.log('stop timer');
                // clearInterval(timerInterval);
                setIsRunning(false);
                break;

            case CONTROLS.reset:
                console.log('reset timer');
                // clearInterval(timerInterval);
                setIsRunning(false);
                setTimer(0);
                setLaps([])
                break;

            case CONTROLS.lap:
                console.log('new lap');
                let isTimeDouble = laps.some(lapTime => lapTime === timer);
                if ((timer !== 0) && !isTimeDouble) setLaps([...laps, timer]);
                break;

            default: // Fehlerbehandlung
                throw new Error('No such control!');
        }
    }

    // Bereite den anzuzeigenden Timestring mittels Hilfsfunktion vor
    let timeString = formatTimeString(timer);


    let lapList = laps.map((lapMillis, index, arr) => {
        let diff = (index > 0) ? lapMillis - arr[index-1] : lapMillis;
        let lapTimeString = formatTimeString(diff);

        return  (<div key={lapMillis}>
                    <hr />
                    <span>#{index+1}</span> | <span>{lapTimeString}</span>
                </div>);
    });

    return (
        <div className="chrono-container">
            <div className="chrono-display">
                <p>
                    <span>{timeString}</span>
                </p>
            </div>
            <div className="chrono-controls">
                <span data-control={CONTROLS.start} onClick={handleControlsClick}>start / stop</span>
                {/* <span data-control={CONTROLS.stop} onClick={handleControlsClick}>stop</span> */}
                <span data-control={CONTROLS.reset} onClick={handleControlsClick}>reset</span>
                <span data-control={CONTROLS.lap} onClick={handleControlsClick}>lap</span>
            </div>

            <div className="lap-times">
                {lapList}
            </div>
        </div>
    );
}

// Hilfsfunktion zum formatieren des Timestrings anhand von übergebenen Millisekunden
function formatTimeString(millis) {
    const dateTime = new Date(millis);

    let timeParts = [
        new String(dateTime.getMinutes()).padStart(2, '0'),
        new String(dateTime.getSeconds()).padStart(2, '0'),
        new String(dateTime.getMilliseconds() / 10).padStart(2, '0'),
    ];

    return `${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
}

export default Chrono;