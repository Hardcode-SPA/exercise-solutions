// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import { fetchStudents } from './data.js';
/* -------------------------------------------------------------------------------  */

getStudents();

// Funktion zum Holen und Rendern aller Studenten
async function getStudents(limit, skip, classId) {
    try {
        // Rufe API-Kommunikations-Funktion fuer das holen der Studentenliste auf
        let studentsResp = await fetchStudents(limit, skip, classId);

        console.log(studentsResp.students[0]);

        // Uebergebe Liste der Studentenobjekte an die Hilfs-Renderfunktion
        renderStudentList(studentsResp.students);
    
    } catch (error) {
        // TODO Fehler an User anzeigen
        console.log(error.message);
    }
}


// Hilfsfunktion zum Rendern aller Studenten in der Tabelle
function renderStudentList(students) {
    // Referenz auf Tabellenkoerper
    let tableBody = document.querySelector('#students-table > tbody');

    // Tabelle zuruecksetzen
    tableBody.replaceChildren();

    // Durchlaufe alle Studenteneintraege
    students.forEach(student => {
        // Zeile fuer Eintrag erstellen
        let row = document.createElement('tr');

        // Namensspalte erstellen und befuellen
        let nameCol = document.createElement('td');
        nameCol.textContent = student.name;

        // Klassen-ID-Spalte erstellen und befuellen
        let classIdCol = document.createElement('td');
        classIdCol.textContent = student.classId;

        // Stadtspalte erstellen und befuellen
        let cityCol = document.createElement('td');
        cityCol.textContent = student.address.city;


        /* ------------ Bedienknoepfe ------------ */
        /* ------- Detailsbutton ------- */
        // Detailsspalte erstellen und befuellen
        let viewCol = document.createElement('td');

        // Detailsbutton erstellen und befuellen
        let viewBtn = document.createElement('button');
        viewBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        viewBtn.textContent = 'Details';

        // TODO ClickListener fuers Anzeigen der Details
        
        // Detailsbutton in Detailsspalte einfuegen
        viewCol.appendChild(viewBtn);


        /* ------- Editierbutton ------- */
        // Editierspalte erstellen und befuellen
        let editCol = document.createElement('td');

        // Editierbutton erstellen und befuellen
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        editBtn.textContent = 'Edit';

        // TODO ClickListener fuers Editieren
        
        // Editierbutton in Editierspalte einfuegen
        editCol.appendChild(editBtn);

        /* ------- Loeschbutton ------- */
        // Loeschspalte erstellen und befuellen
        let deleteCol = document.createElement('td');

        // Loeschbutton erstellen und befuellen
        let delBtn = document.createElement('button');
        delBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm');
        delBtn.textContent = 'Delete';

        // TODO ClickListener fuers Loeschen

        // Loeschbutton in Loeschspalte einfuegen
        deleteCol.appendChild(delBtn);

        // Alle Spalten in Zeile einfuegen
        row.appendChild(nameCol);
        row.appendChild(classIdCol);
        row.appendChild(cityCol);
        row.appendChild(viewCol);
        row.appendChild(editCol);
        row.appendChild(deleteCol);

        // Fertige Zeile in Tabelle einfuegen
        tableBody.appendChild(row);
    });
}


let addStudentForm = document.querySelector('#add-student-form');
addStudentForm.addEventListener('submit', submitNewStudent);


function submitNewStudent(evt) {
    evt.preventDefault();

    // Extrahiere Daten aus den Eingabefeldern

    // Validiere Daten in den Eingabefeldern und reagiere darauf

    // Uebergebe Userdaten an API-Kommunikationsfunktion (POST)
    // zum Anlegen neuer Studenten

    // Hole neue Studentenliste und erneuere die Ansicht
    getStudents();
}