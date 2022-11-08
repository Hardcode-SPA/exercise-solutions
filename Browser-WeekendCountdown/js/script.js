// Hole form Referenz
const form =  document.querySelector('form');
// Hole input Referenz
const nameInput = document.querySelector('#welcome-name');
// Hole button Referenz
const submitBtn = document.querySelector('#submit-btn');
// Hole antwort-div Referenz
const answerDiv = document.querySelector('#answer');


// EventHandler für das submit Event des Formulars
form.addEventListener('submit', evt => {
    // Unterbinde standard Verhalten des Browser für das Formular
    evt.preventDefault();

    // Brich ab, wenn Namenseingabe leer
    if (nameInput.value.trim().length === 0) return;

    // Extrahiere eingegebenen Namen
    let welcomeName = nameInput.value.trim();

    // Setze Antwort String in das Antwort Div
    answerDiv.innerText = constructWelcomeString(welcomeName, new Date());

    // Setze das Eingabefeld zurück
    nameInput.value = '';
    // Setze den Button zurück
    submitBtn.disabled = true;
});


// EventHandler für das Eingabefeld auf dem input Event
nameInput.addEventListener('input', evt => {
    // Aktiviere den Button nur, wenn das Eingabefeld nicht leer ist
    if (evt.target.value.trim().length > 0) submitBtn.disabled = false;
    else submitBtn.disabled = true;
});

// Hilfsfunktion zum Erstellen des Antwortstrings
function constructWelcomeString(name, date) {
    // Errechne Tage bis zum Wochenende
    let daysToWeekend = calcDaysUntilWeekend(date);
    // Baue String für die Tage bis zum Wochenende zusammen
    let daysLeftString = (daysToWeekend != 0) ? `Only ${daysToWeekend} days left until weekend!` : `It's weekend already!`;
    
    // Gebe fertigen String zurück
    return `Hello ${name}. Today is ${getWeekdayString(date)}. ${daysLeftString}`;
}

// Hilfsfunktion zum ermitteln des textuellen Wochentags
function getWeekdayString(date) {
    let result = '';

    switch(date.getDay()) {
        case 0:
            result = 'Sunday';
            break;
        case 1:
            result = 'Monday';
            break;
        case 2:
            result = 'Tuesday';
            break;
        case 3:
            result = 'Wednesday';
            break;
        case 4:
            result = 'Thursday';
            break;
        case 5:
            result = 'Friday';
            break;
        case 6:
            result = 'Saturday';
            break;
    }

    return result;
}

// Hilfsfunktion zum Berechnen der Tage bis zum Wochenende
function calcDaysUntilWeekend(date) {
    const FRIDAY = 5;

    // Berechne Differenz zwischen übergebenem Tag und Freitag
    let diff = FRIDAY - date.getDay();

    // Wenn negative Differenz oder Sonntag,
    // Setze Differenz auf 0, denn Freitag-Sonntag is WE
    if (diff < 0 || date.getDay() === 0) {
        diff = 0;
    }

    return diff;
}