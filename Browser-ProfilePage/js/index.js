// Referenzen auf Formular und alle darin enthaltenen Formular Elemente
let profileForm = document.querySelector('form');
let nameInput = profileForm.querySelector('input[type="text"]');
let birthdateInput = profileForm.querySelector('input[type="date"]');
let avatarInput = profileForm.querySelector('input[type="file"]');
let primeColorInput = profileForm.querySelector('#primaryColor');
let secondColorInput = profileForm.querySelector('#secondaryColor');
let aboutInput = profileForm.querySelector('textarea');
let skillsCheckboxes = profileForm.querySelectorAll('input[type="checkbox"]');

// Haenge Formular EventListener (submit) an
profileForm.addEventListener('submit', evt => {
    // Unterbinde das Standard Verhalten des Browser beim Ausloesen des submit-Events
    evt.preventDefault();

    // Rufe Hilfsfunktion zum Zuruecksetzen von Fehleranzeigen auf
    resetErrors();

    // Early return, wenn Formular nicht erfolgreich validiert
    if (!isFormValid()) return;

    // Erstelle neues SECTION Element
    let cvSection = document.createElement('SECTION');
    // Fuege der neuen SECTION eine entsprechende CSS-Klasse hinzu
    cvSection.classList.add('cv-section');
    // Setze Farbwert des ersten Farbinputs als Hintergrundfarbe der neuen SECTION
    cvSection.style.backgroundColor = primeColorInput.value;
    // Setze Farbwert des zweiten Farbinputs als Schriftfarbe der neuen SECTION
    cvSection.style.color = secondColorInput.value;
    // Haenge das neue SECTION Element dem BODY an
    document.body.append(cvSection);


    // Erstelle neues SPAN Element als Schliessbutton der SECTION
    let closeBtn = document.createElement('SPAN');
    // Fuege Text in SPAN ein
    closeBtn.textContent = 'X';
    // Haenge dem SPAN einen EventListener (click) zum Entfernen der SECTION an
    closeBtn.addEventListener('click', evt => cvSection.remove());
    // Fuege neues SPAN Element in die neue SECTION ein
    cvSection.appendChild(closeBtn);

    // Erstelle H1 Element fuer den Namen
    let cvTitle = document.createElement('H1');
    // Fuege Wert aus dem Namensinput in das H1 ein
    cvTitle.textContent = nameInput.value.trim();
    // Fuege neues H1 Element in die neue SECTION ein
    cvSection.appendChild(cvTitle);

    // Erstelle neues H3 Element fuer das Alter
    let cvAge = document.createElement('H3');
    // Extrahiere Alter aus dem GeburtsdatumsInput mithilfe von Hilfsfunktion calcAge
    let age = calcAge(new Date(birthdateInput.value));
    // Fuege in das H3 einen String fuer das Alter ein
    cvAge.textContent = `${nameInput.value.trim()} is ${age} years old`;
    // Fuege neues H3 Element fuer das Alter in die neue SECTION ein
    cvSection.appendChild(cvAge);

    // Erstelle neues IMG Element fuer das Profilbild
    let avatarImg = document.createElement('IMG');
    // Fuege dem neuen IMG Element einen alt-Text hinzu
    avatarImg.setAttribute('alt', `A picture of ${nameInput.value.trim()}`);
    // Extrahiere File aus dem filePicker
    let imgFile = avatarInput.files[0];

    // Erstelle neuen FileReader zum Einlesen des Files
    /* let fileReader = new FileReader();
    // Fuege dem FileReader einen EventListener (load) hinzu
    fileReader.addEventListener('load', evt => {
        // Fuege die Base64 Repraesentation des Files als src des IMG Elements ein
        avatarImg.src = evt.target.result;
    });
    // Starte das File Einlesen des Files mit dem FileReader
    fileReader.readAsDataURL(imgFile); */
    
    // Setze das eingelesene File als src des IMG Elements
    avatarImg.src = URL.createObjectURL(imgFile);
    // Fuege neues IMG Element fuer das Profilbild in die neue SECTION ein
    cvSection.appendChild(avatarImg);

    // Erstelle neues H5 Element fuer die About Ueberschrift
    let aboutTitle = document.createElement('H5');
    // Befuelle Ueberschrift mit einem Text, der den Namen beinhaltet
    aboutTitle.textContent = `Something about ${nameInput.value.trim()}`;
    // Fuege neues H5 Element fuer die About-Ueberschrift in die neue SECTION ein
    cvSection.appendChild(aboutTitle);

    // Erstelle neues P Element fuer den About Text
    let aboutText = document.createElement('P');
    // Fuege in das P Element des eingegebenen About Text ein
    aboutText.textContent = aboutInput.value.trim();
    // Fuege neues P Element fuer den About-Text in die neue SECTION ein
    cvSection.appendChild(aboutText);

    // Erstelle neues H5 Element fuer die Skills Ueberschrift
    let skillsTitle = document.createElement('H5');
    // Befuelle die Ueberschrift mit einem Text, der den Namen beinhaltet
    skillsTitle.textContent = `${nameInput.value.trim()}'s programming skills`;
    // Fuege neues H5 Element fuer die Skills-Ueberschrift in die neue SECTION ein
    cvSection.appendChild(skillsTitle);

    // Erstelle neues UL Element fuer die Skills Liste
    let skillsList = document.createElement('UL');
    // Durchlaufe alle Skill Checkboxen
    skillsCheckboxes.forEach(checkbox => {
        // Wenn Checkbox angehakt ist
        if (checkbox.checked) {
            // Erstelle neues LI Element fuer den entsprechenden Skill
            let skillItem = document.createElement('LI');
            // Befuelle das neue LI mit dem value der Checkbox
            skillItem.textContent = checkbox.value;
            // Fuege neues LI Element fuer den Skill in das neue UL ein
            skillsList.appendChild(skillItem);
        }
    });

    // Fuege neues UL Element fuer die Skills-Liste in die neue SECTION ein
    cvSection.appendChild(skillsList);
});

// ? Vielleicht sollte man den disabled Zustand des Button anhand der Vollstaendigkeit der Buttons regeln (Design-Entscheidung)
// profileForm.addEventListener('input', evt => console.log(evt));

// Hilfsfunktion zum Validieren des Formulars
// Gibt true zurueck, wenn alles valide
// Gibt false zurueck, wenn nicht alles valide und fuegt entsprechenden Elementen
// eine CSS Klasse hinzu
function isFormValid() {
    // Rueckgabewert
    let isValid = true;

    // Pruefe, ob Namensinput leer ist
    if (nameInput.value.trim().length <= 0) {
        // Rueckgabewert auf false
        isValid = false;
        // Fuege dem Input die Fehlerklasse hinzu
        nameInput.classList.add('error');
    }

    // Pruefe, ob Wert des Datumsinputs ein valides Date ist
    if (isNaN(Date.parse(birthdateInput.value))) {
        // Rueckgabewert auf false
        isValid = false;
        // Fuege dem Input die Fehlerklasse hinzu
        birthdateInput.classList.add('error');
    }

    // Pruefe, ob fileInput befuellt wurde und, ob es sich um ein Bild handelt
    if (!avatarInput.files[0] || !avatarInput.files[0].type.includes('image')) {
        // Rueckgabewert auf false
        isValid = false;
        // Fuege dem Input die Fehlerklasse hinzu
        avatarInput.classList.add('error');
    }

    // Pruefe, ob aboutInput leer ist
    if (aboutInput.value.trim().length <= 0) {
        // Rueckgabewert auf false
        isValid = false;
        // Fuege dem Input die Fehlerklasse hinzu
        aboutInput.classList.add('error');
    }

    // Gebe Rueckgabewert als Indikator des Validitaet des Formulars zurueck
    return isValid;
}

// Hilfsfunktion zum entfernen der Fehleranzeigen
function resetErrors() {
    // Durchlaufe alle inputs und entferne die CSS-Klasse error
    profileForm.querySelectorAll('input, textarea').forEach(input => {
        input.classList.remove('error');
    });
}

// Hilfsfunktion zum Ermitteln des Alters anhand des Geburtsdatums
function calcAge(birthdate) {
    // Erstelle Datumsobjekt fuer heute
    let today = new Date();
    // Errechne Jahre zwischen Geburtsjahr und aktuellem Jahr
    let age = (today.getFullYear() - birthdate.getFullYear());

    // Erstelle Kopie des Geburtsdatums
    let birthdateThisYear = new Date(birthdate);
    // Setze Kopie auf aktuelles Jahr
    birthdateThisYear.setFullYear(today.getFullYear());

    // Pruefe, ob Geburtstag noch nicht war
    if (birthdateThisYear > today) {
        // Ziehe von errechnetem Alter ein Jahr ab
        age -= 1;
    }

    // Gebe ermitteltes Alter als Rueckgabewert zurueck
    return age;
}