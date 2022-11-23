// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
// Import any additional modules you want to include below \/


// \/ All of your javascript should go here \/
// Referenz auf Modal Dialog
let modal = document.querySelector('#myModal');

// Promise-basierte Funktion zum oeffnen des Modal-Dialogs
// Beginnt den Promise erst bei Aufruf
function showModal() {
    // Gebe neues Promise zurueck
    return new Promise((resolve, reject) => {
        // Setze Timeout fuer 60 Sekunden
        setTimeout(() => {
            // Neues Date Objekt
            let time = new Date();
            // Setze Uhrzeit auf 22:00
            time.setHours(22,0,0,0);
    
            // Wenn Uhrzeit 22:00 oder spaeter, melde Promise als erfolgreich
            if (time.getHours() >= 22) resolve();
            // Sonst melde Promise als gescheitert
            else reject('Falsche Uhrzeit fuer sowas!');
        }, 60000);
    });
}



// Fuege dem Close-Button des Modal-Dialogs einen EventListener (click) hinzu
modal.querySelector('.close').addEventListener('click', evt => {
    // Verstecke Modal-Dialog
    modal.style.display = 'none';
});

// Rufe die Funktion auf, die mir ein Promise zurueckgibt
// und verarbeite das Ergebnis
showModal()
    .then(() => {
        // Zeige Modal-Dialog an
        modal.style.display = 'block';
    })
    .catch((error) => {
        // Gebe uebergebenen Fehlerstring aus
        console.log(error);
    });