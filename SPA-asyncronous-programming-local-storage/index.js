

// Referenz auf Eingabemaske allgemein
let creationForm = document.querySelector('#form');

// Referenzen auf Eingabefelder
let firstNameInput = document.querySelector('#firstName');
let lastNameInput = document.querySelector('#lastName');
let programmingLanguageSelect = document.querySelector('#programmingLanguage');

// Referenz auf Bestaetigungsbutton
let sendBtn = document.querySelector('#send');

// Referenz auf Loeschbutton
let resetBtn = document.querySelector('#reset');

// Referenz auf Tabelle der Developer
let devTableBody = document.querySelector('table > tbody');

// Konstante fuer den Key des Arrays im LocalStorage
const DEVELOPERS_KEY = 'developers';


(function () {
    // Lade die View initial
    renderDevs();

    resetBtn.addEventListener('click', evt => {
        // Loesche Daten der Developer aus dem LocalStorage
        deleteArrayFromStorage(DEVELOPERS_KEY);
        
        // Erneuere die View
        renderDevs();
    });
    
    // EventListener (click) auf dem Button keine allzu gute Idee
    sendBtn.addEventListener('click', evt => {
        console.log('Browser Validierung wird beim Click-Event nicht ausgefuehrt');
        console.log('Manuelle Validierung der Daten noetig...');
    });
    
    
    creationForm.addEventListener('submit', evt => {
        // Verhindere Standardverhalten des Events
        evt.preventDefault();
    
        // Extrahiere Daten aus den Eingabefeldern
        let firstName = firstNameInput.value.trim();
        let lastName = lastNameInput.value.trim();
        let programmingLanguage = programmingLanguageSelect.value;
    
        // Manuelle Validierung via JS
        // Erfordert noch die Anzeige der Fehler in der GUI fuer den User
        // if (firstName.length < 1) return;
        // if (lastName.length < 1) return;
    
        // Erstelle Objekt aus den extrahierten Daten
        let newDeveloper = {
            firstName: firstName,
            lastName: lastName,
            programmingLanguage: programmingLanguage
        };
    
        // Speichere die neuen Daten im LocalStorage
        saveToStorage(DEVELOPERS_KEY, newDeveloper);
    
        // Erneuere die View
        renderDevs();
    });
})();


function renderDevs() {
    // Hole Developerdaten aus LocalStorage
    let developers = getArrayFromStorage(DEVELOPERS_KEY);
    
    // Zeige Daten in Tabelle an
    renderTable(developers);
}



/* --------------- Hilfsfunktionen --------------- */

// Renderfunktion zum Erstellen der Tabellenzeilen der Developer
function renderTable(developers) {
    // Erstelle Array mit Tabellenzeilen fuer die Developereintraege
    let tableRows = developers.map(developer => {
        let row = document.createElement('tr');

        let firstNameCol = document.createElement('td');
        firstNameCol.textContent = developer.firstName;

        let lastNameCol = document.createElement('td');
        lastNameCol.textContent = developer.lastName;

        let programmingLanguageCol = document.createElement('td');
        programmingLanguageCol.textContent = developer.programmingLanguage;

        row.replaceChildren(firstNameCol, lastNameCol, programmingLanguageCol);

        return row;
    });

    // Ersetze alle Zeilen durch die neuen
    devTableBody.replaceChildren(...tableRows);
}

function saveToStorage(key, developer) {
    // Hole Array mit Daten aus localStorage oder alternativ leeres Array
    let developers = getArrayFromStorage(key);

    // Erweitere Array mit den neuen Daten
    developers.push(developer);

    // Setze Value unter dem Key neu mit dem erweiterten Array
    localStorage.setItem(key, JSON.stringify(developers));
}

function getArrayFromStorage(key) {
    // Hole Array anhand des key aus dem localStorage
    let data = JSON.parse(localStorage.getItem(key));

    // Gebe geholte zurueck falls vorhanden, sonst leeres Array
    return data ? data : [];
}

function deleteArrayFromStorage(key) {
    // Entfernt die Daten eines bestimmten Keys aus dem LocalStorage
    localStorage.removeItem(key);
        
    // Entfernt ALLES aus dem LocalStorage
    // localStorage.clear();
}