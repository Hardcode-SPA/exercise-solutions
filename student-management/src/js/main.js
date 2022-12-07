// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Import our custom JS
import { fetchStudents, fetchStudent, postStudent, putStudent, deleteStudent } from './data.js';
/* -------------------------------------------------------------------------------  */


// Konstante Pagegroesse
const PAGE_SIZE = 10;
// Aktuelle Anzahl uebersprungener Eintraege
let currentSkip = 0;

// IIFE (Immediately invoked function expression) fuer initialen Code
(function () {
    // Hole initial erste Eintraege
    getStudents(PAGE_SIZE, currentSkip);

    // Referenz auf Hinzufuegemaske neuer Studenten
    let addStudentForm = document.querySelector('#add-student-form');
    // EventListener (submit) fuer das Hinzufuegen neuer Studenten
    addStudentForm.addEventListener('submit', submitNewStudent);
})();

// Funktion zum Holen und Rendern aller Studenten
async function getStudents(limit, skip, classId) {
    try {
        // Rufe API-Kommunikations-Funktion fuer das holen der Studentenliste auf
        let studentsResp = await fetchStudents(limit, skip, classId);

        // Extrahiere Pageanzahl aus API-Response
        let pageCount = studentsResp.info.pages;

        // Extrahiere Gesamtanzahl der Eintraege aus API-Response
        let itemCount = studentsResp.info.count;

        // Errechne aktuelle Pagenummer
        // Aktuelle Anzahl uebersprungener Elemente geteilt durch die Pagegroesse + 1
        let currentPage = (currentSkip / PAGE_SIZE) + 1;

        // Rufe Funktion zum korrekten Rendern des Paginationen Elements auf
        renderPagination(pageCount, currentPage);

        // Uebergebe Liste der Studentenobjekte an die Hilfs-Renderfunktion
        renderStudentList(studentsResp.students.reverse());
    
    } catch (error) {
        // TODO Fehler an User anzeigen
        console.log(error.message);
    }
}

// Hilfsfunktion zum Aufbauen und Rendern des Pagination Elements
function renderPagination(pageCount, currentPage) {
    // Referenz auf Pagination UL
    let paginationList = document.querySelector('#pagination-list');

    // Array zum Speichern neuer Pagination Items (sozusagen Seitennummern)
    let newPageItems = [];

    // Schleife ueber Anzahl der Pages
    // Erstellt alle Pageitems
    for (let pageIndex = 1; pageIndex <= pageCount; pageIndex++) {
        // Neues Listitem fuer das Pageitems
        let pageItem = document.createElement('li');
        pageItem.classList.add('page-item');

        // Markiere aktuelle Seitenzahl als active
        if (pageIndex === currentPage) pageItem.classList.add('active');

        // Neuer Anchor fuer das Pageitem
        let pageAnchor = document.createElement('a');
        pageAnchor.classList.add('page-link');
        pageAnchor.href = '#';
        // Befuelle mit entsprechender Pagenummer
        pageAnchor.textContent = pageIndex;

        pageAnchor.addEventListener('click', evt => {
            // Passe die aktuelle Anzahl uebersprungener Elemente 
            // der Seitenzahl entsprechend an
            // newSkip = PAGE_SIZE * (newPageNumber - 1)
            currentSkip = PAGE_SIZE * (pageIndex - 1);

            // Rufe Funktion zum Holen und Rendern der Studentenliste auf
            getStudents(PAGE_SIZE, currentSkip);
        });

        // Fuege Anchor in Listitem ein
        pageItem.appendChild(pageAnchor);

        // Fuege Listitem als Pageitem in das Array fuer die neuen Pageitems ein
        newPageItems.push(pageItem);
    }

    // Erstelle Array aus der HTMLCollection der Kindelemente in der Pagination UL
    let pageItems = Array.from(paginationList.children);

    // Schneide bisherige Pageitems raus (erstes LI und letztes LI bleiben bestehen)
    // und ersetze mit spread-list der neuen Pageitems
    pageItems.splice(1, pageItems.length-2, ...newPageItems);

    // Referenz auf Anchor des ersten und letzten Pageitems (Pfeil-links, Pfeil-rechts)
    let prevAnchor = pageItems[0].children[0]; // zurueck-Schalter
    let nextAnchor = pageItems[pageItems.length-1].children[0]; // vor-Schalter

    // Wenn aktuelle Page die erste ist
    if (currentPage === 1) {
        // deaktiviere visuell den Zurueck-Schalter
        prevAnchor.classList.add('disabled');

    } else {
        // aktiviere visuell den Zurueck-Schalter
        prevAnchor.classList.remove('disabled');

        // Setze Clicklistener auf den Zurueck-Schalter
        prevAnchor.onclick = evt => {
            // Verringere die aktuelle Anzahl uebersprungener Elemente um eine Pagesize
            currentSkip -= PAGE_SIZE;

            // Rufe Funktion zum Holen und Rendern der Studentenliste auf
            getStudents(PAGE_SIZE, currentSkip);
        };
    }

    // Wenn aktuelle Page die letzte ist
    if (currentPage === pageCount) {
        // deaktiviere visuell den Vor-Schalter
        nextAnchor.classList.add('disabled');

    } else {
        // aktiviere visuell den Vor-Schalter
        nextAnchor.classList.remove('disabled');

        // Setze Clicklistener auf den Vor-Schalter
        nextAnchor.onclick = evt => {
            // Erhoehe die aktuelle Anzahl uebersprungener Elemente um eine Pagesize
            currentSkip += PAGE_SIZE;

            // Rufe Funktion zum Holen und Rendern der Studentenliste auf
            getStudents(PAGE_SIZE, currentSkip);
        };
    }

    // Ersetze DOM Elemente der aktuellen Pagination UL mit den ueberarbeiteten
    paginationList.replaceChildren(...pageItems);
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
        // Speichere ID des Eintrags im Dataset der Zeile
        row.dataset.studentId = student._id;

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
        viewCol.classList.add('text-center');

        // Detailsbutton erstellen und befuellen
        let viewBtn = document.createElement('button');
        viewBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        let viewIcon = document.createElement('i');
        viewIcon.classList.add('icon', 'bi-person-vcard');
        viewBtn.appendChild(viewIcon);

        // ClickListener fuers Anzeigen der Details
        viewBtn.addEventListener('click', handleDetailsClick);
        
        // Detailsbutton in Detailsspalte einfuegen
        viewCol.appendChild(viewBtn);


        /* ------- Editierbutton ------- */
        // Editierspalte erstellen und befuellen
        let editCol = document.createElement('td');
        editCol.classList.add('text-center');

        // Editierbutton erstellen und befuellen
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        let editIcon = document.createElement('i');
        editIcon.classList.add('icon', 'bi-pencil');
        editBtn.appendChild(editIcon);

        // ClickListener fuers Bearbeiten des Eintrags
        editBtn.addEventListener('click', handleEditClick);
        
        // Editierbutton in Editierspalte einfuegen
        editCol.appendChild(editBtn);

        /* ------- Loeschbutton ------- */
        // Loeschspalte erstellen und befuellen
        let deleteCol = document.createElement('td');
        deleteCol.classList.add('text-center');

        // Loeschbutton erstellen und befuellen
        let delBtn = document.createElement('button');
        delBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm');
        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('icon', 'bi-x-circle');
        delBtn.appendChild(deleteIcon);

        // ClickListener fuers Bearbeiten des Eintrags
        delBtn.addEventListener('click', handleDeleteClick);

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

// Clickhandler fuer Details-Button
function handleDetailsClick(evt) {
    // Extrahiere Studenten-ID aus der zugehoerigen Zeile
    let tableRow = evt.target.closest('tr');
    let studentId = tableRow.dataset.studentId;

    // Hole Studentendaten und zeige an
    fetchStudent(studentId)
        .then(result => {
            createStudentView(result[0]);
        })
        .catch(err => {
            console.error(err);
        });
}

// Hilfsfunktion zum Erstellen der Detailansicht
function createStudentView(studentData) {
    // Referenz auf offcanvas
    let offcanvasElem = document.querySelector('#offcanvas-details');
    let offcanvasBody = offcanvasElem.querySelector('.offcanvas-body');
    // Bootstrap Offcanvas Instanz
    let offcanvas = new bootstrap.Offcanvas(offcanvasElem);

    // Setze offcanvas-body zurueck
    offcanvasBody.replaceChildren();


    /* ----------------------- Datenzeilen ----------------------- */

    /* -------------- Metadaten-Zeile -------------- */
    // Erstelle Zeile
    let metaDataRow = document.createElement('div');
    metaDataRow.classList.add('row', 'text-center', 'mb-4');

    // Erstelle Spalte fuer Studenten-ID
    let studentIdCol = document.createElement('div');
    studentIdCol.classList.add('col');
    studentIdCol.textContent = `ID: ${studentData._id}`;

    // Erstelle Spalte fuer Studentenname
    let nameCol = document.createElement('div');
    nameCol.classList.add('col');
    nameCol.textContent = `Name: ${studentData.name}`;

    // Erstelle Spalte fuer Klassen-ID
    let classIdCol = document.createElement('div');
    classIdCol.classList.add('col');
    classIdCol.textContent = `Class ID: ${studentData.classId}`;

    // Verbinde alle Elemente der Zeile miteinander und fuege in offcanvas ein
    metaDataRow.appendChild(studentIdCol);
    metaDataRow.appendChild(nameCol);
    metaDataRow.appendChild(classIdCol);
    offcanvasBody.appendChild(metaDataRow);

    /* -------------- Adressdaten-Zeile -------------- */
    // Erstelle Zeile
    let addressRow = document.createElement('div');
    addressRow.classList.add('row', 'text-center');

    // Erstelle Spalte fuer Stadt
    let cityCol = document.createElement('div');
    cityCol.classList.add('col');
    cityCol.textContent = `City: ${studentData.address.city}`;

    // Erstelle Spalte fuer Postleitzahl
    let zipCol = document.createElement('div');
    zipCol.classList.add('col');
    zipCol.textContent = `ZIP: ${studentData.address.postalCode}`;

    // Erstelle Spalte fuer Strasse und Hausnummer
    let streetCol = document.createElement('div');
    streetCol.classList.add('col');
    streetCol.textContent = `Street: ${studentData.address.street} ${studentData.address.streetNum}`;

    // Verbinde alle Elemente der Zeile miteinander und fuege in offcanvas ein
    addressRow.appendChild(cityCol);
    addressRow.appendChild(zipCol);
    addressRow.appendChild(streetCol);
    offcanvasBody.appendChild(addressRow);

    // Zeige offcanvas an
    offcanvas.show();
}

// Clickhandler fuer Edit-Button
function handleEditClick(evt) {
    // Extrahiere Studenten-ID aus der zugehoerigen Zeile
    let tableRow = evt.target.closest('tr');
    let studentId = tableRow.dataset.studentId;

    // Hole Studentendaten und zeige Bearbeitungsdialog an
    fetchStudent(studentId)
        .then(result => {
            createEditView(result[0]);
        })
        .catch(err => {
            console.error(err);
        });
}

// Hilfsfunktion zum Erstellen der Bearbeitungsansicht
function createEditView(studentData) {
    let editModalElem = document.querySelector('#edit-student-modal');
    let editModalBody = editModalElem.querySelector('.modal-body');

    let editModal = new bootstrap.Modal(editModalElem);

    // Referenzen auf Eingabefelder
    let editForm = document.querySelector('#edit-student-form');
    let idInput = document.querySelector('#edit-id-input');
    let nameInput = document.querySelector('#edit-name-input');
    let classIdInput = document.querySelector('#edit-class-id-input');
    let cityInput = document.querySelector('#edit-city-input');
    let zipInput = document.querySelector('#edit-zip-input');
    let streetInput = document.querySelector('#edit-street-input');
    let streetNoInput = document.querySelector('#edit-street-no-input');

    // Referenz auf Fehleranzeige
    let errorBox = document.querySelector('#error-box');

    // Befuelle Eingabefelder mit bisherigen Daten des Eintrags
    idInput.value = studentData._id;
    nameInput.value = studentData.name;
    classIdInput.value = studentData.classId;
    cityInput.value = studentData.address.city;
    zipInput.value = studentData.address.postalCode;
    streetInput.value = studentData.address.street;
    streetNoInput.value = studentData.address.streetNum;

    // Fuege dem Formular einen EventListener (submit) hinzu
    editForm.onsubmit = evt => {
        // Verhindere die Standard Eventbehandlung des Browsers
        evt.preventDefault();

        // Befuelle studentData mit Daten aus den Eingaben
        studentData.name = nameInput.value.trim();
        studentData.classId = classIdInput.value.trim();
        studentData.address.city = cityInput.value.trim();
        studentData.address.postalCode = zipInput.value.trim();
        studentData.address.street = streetInput.value.trim();
        studentData.address.streetNum = streetNoInput.value.trim();

        // Fuehre Aenderunganfrage an Server aus
        putStudent(studentData)
            .then(result => {
                // Fehleranzeige verstecken
                errorBox.classList.add('visually-hidden');
                // Schliesse Modaldialog
                editModal.hide();

                // Hole neue Studentenliste und erneuere die Ansicht
                getStudents(PAGE_SIZE, currentSkip);
            })
            .catch(err => {
                console.error(err);

                // Fehleranzeige mit Fehlernachricht befuellen
                errorBox.querySelector('.card-text').textContent = JSON.parse(err.message).message;
                // Fehleranzeige anzeigen
                errorBox.classList.remove('visually-hidden');
            });
    };

    // Fehleranzeige verstecken
    errorBox.classList.add('visually-hidden');

    // Zeige Modal Dialog an
    editModal.show();
}

// Clickhandler fuer Delete-Button
function handleDeleteClick(evt) {
    // Extrahiere Studenten-ID aus der zugehoerigen Zeile
    let tableRow = evt.target.closest('tr');
    let studentId = tableRow.dataset.studentId;

    // Referenz auf Loeschdialog und neue Modalinstanz darauf
    let deleteModalElem = document.querySelector('#delete-student-modal');
    let deleteModal = new bootstrap.Modal(deleteModalElem);

    // Befulle ID im Modal Dialog
    deleteModalElem.querySelector('#delete-student-id-span').textContent = studentId;
    
    // Setze onclick-Listener des Bestaetigungsknopfs im Modal Dialog
    deleteModalElem.querySelector('#delete-student-confirm-btn').onclick = evt => {
        deleteStudent(studentId)
            .then(async result => {
                // Verstecke Bestaetigungsdialog
                deleteModal.hide();

                // Extrahiere Gesamtanzahl der Eintraege aus der API-Response
                let resp = await fetchStudents(1, 0);
                let count = resp.info.count;

                // Errechne aktuelle Page
                let currentPage = (currentSkip / PAGE_SIZE) + 1;

                // Wenn derzeitige Anzahl uebersprungener Eintraege
                // groesser oder gleich der Gesamtanzahl der Eintraege,
                // setze Anzahl uebersprungener Eintraege um eine Seite zurueck
                if (currentSkip >= count) currentSkip = PAGE_SIZE * (currentPage - 2);

                // Lade Liste der Studenten neu
                getStudents(PAGE_SIZE, currentSkip);
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Zeige Modal Dialog an
    deleteModal.show();
}

// Submithandler fuer Hinzufuegemaske
function submitNewStudent(evt) {
    // Verhindere die Standard Eventbehandlung des Browsers
    evt.preventDefault();

    // Validiere Daten in den Eingabefeldern und reagiere darauf
    let data = validateAddNewForm();
    if (!data) {
        // TODO zeige dem User den Fehler an
        console.error('Form is not valid');
        return;
    }

    // Uebergebe Userdaten an API-Kommunikationsfunktion (POST)
    // zum Anlegen neuer Studenten
    postStudent(data)
        .then(async result => {
            // Hole neue Liste der Eintraege, um Anzahl Pages zu extrahieren
            let resp = await fetchStudents(PAGE_SIZE, 0);

            // Extrahiere Gesamtanzahl Pages aus API-Response
            let pages = resp.info.pages;

            // Setze currentSkip so, dass letzte Seite geholt und angezeigt wird
            currentSkip = PAGE_SIZE * (pages - 1);

            // Hole neue Studentenliste und erneuere die Ansicht
            getStudents(PAGE_SIZE, currentSkip);
        })
        .catch(err => {
            console.error(err);
        });
}

// Hilfsfunktion zum Validieren der Eingaben
function validateAddNewForm() {
    // Extrahiere Daten aus den Eingabefeldern
    let nameInput = document.querySelector('#add-name-input');
    let classIdInput = document.querySelector('#add-class-id-input');
    let cityInput = document.querySelector('#add-city-input');
    let zipInput = document.querySelector('#add-zip-input');
    let streetInput = document.querySelector('#add-street-input');
    let streetNoInput = document.querySelector('#add-street-no-input');

    // Pruefe, ob Postleitzahl und Hausnummer tatsaechlich Zahlen sind
    if (isNaN(parseInt(zipInput.value))) return null;
    if (isNaN(parseInt(streetNoInput.value))) return null;

    return {
        name: nameInput.value.trim(),
        classId: classIdInput.value.trim(),
        address: {
            city: cityInput.value.trim(),
            postalCode: parseInt(zipInput.value.trim()),
            street: streetInput.value.trim(),
            streetNum: parseInt(streetNoInput.value.trim()),
        }
    };
}