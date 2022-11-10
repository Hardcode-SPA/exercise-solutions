// Hole Referenz auf Liste der Reiseziele
let destinationsList = document.querySelector('#fav-destinations-list');
// Hole Referenz auf Items der Liste der Reiseziele
let destinationItems = destinationsList.children;
// Hole Referenz auf Button zum Anzeigen/Verstecken der Liste
let toggleListBtn = document.querySelector('#toggle-list-btn');
// Hole Referenz auf Nachrichtsbox zum Anzeigen der derzeitigen Auswahl
let messageBox = document.querySelector('#message-box');
// Hole Referenz auf Stadt-Platzhalter innerhalb der Nachrichtsbox
let messageBoxCity = messageBox.querySelector('strong');


// Verstecke Liste ueber die display-property
// destinationsList.style.display = 'none';

toggleListBtn.addEventListener('click', clickEvt => {
    // Bootstrap hat dafuer eine extra Klasse, die getoggelt werden kann
    destinationsList.classList.toggle('d-none');

    // Pruefe ueber Klassenliste, ob Reisezielliste versteckt ist (also ist d-none enthalten?)
    /* if (destinationsList.classList.contains('d-none')) {
        // Aendere Buttontext entsprechend
        toggleListBtn.innerText = 'Show destinations';
    } else {
        // Aendere Buttontext entsprechend
        toggleListBtn.innerText = 'Hide destinations';
    } */

    // Oder in kuerzer als ternaerer Operator
    toggleListBtn.innerText = (destinationsList.classList.contains('d-none')) ? 'Show destinations' : 'Hide destinations';
});

// der clickEventHandler fuer die destinationListItems
function handleListItemClick(clickEvt) {
    // Hole Element, das derzeitig als active gesetzt via der active-Klasse
    let currentActive = destinationsList.querySelector('.active');
    // Entferne active-Klasse aus der classList des derzeitig als active markierten Elements
    currentActive.classList.remove('active');

    // Fuege die active-Klasse dem Element, das das ClickEvent ausgeloest hat zur classList hinzu
    clickEvt.target.classList.add('active');

    // Setze Namen des gewaehlten Ziels in die MessageBox ein
    messageBoxCity.innerText = clickEvt.target.innerText;
}


// Wandle HTMLCollection von destinationItems in Array um und durchlaufe per .forEach
Array.from(destinationItems).forEach(destinationItem => {
    // Haenge an jedes Item der Liste den clickEventHandler handleListItemClick an
    destinationItem.addEventListener('click', handleListItemClick);
});





























/* const toggleListBtn = document.querySelector('#toggle-list-btn');
const favDestinationsList = document.querySelector('#fav-destinations-list');
const messageBox = document.querySelector('#message-box');

// EventHandler fuer Click auf den Button
toggleListBtn.addEventListener('click', evt => {
    favDestinationsList.classList.toggle('d-none');
    toggleListBtn.innerText = favDestinationsList.classList.contains('d-none') ? 'Show destinations' : 'Hide destinations';
});

const destinationItems = favDestinationsList.children;

const destinationItemCallback = evt => {
    let currSelectedItem = document.querySelector('.active');
    let newSelectedItem = evt.target;

    currSelectedItem.classList.remove('active');

    newSelectedItem.classList.add('active');

    if ( messageBox.classList.contains('d-none') ) {
        messageBox.classList.toggle('d-none');
    }
    messageBox.innerText = `You selected ${newSelectedItem.innerText}`;
};

Array.from(destinationItems).forEach(item => {
    item.addEventListener('click', destinationItemCallback);
}); */