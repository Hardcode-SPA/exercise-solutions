import '../css/style.css';
import { rickAndMortyCharacters } from './data.js';

// Fuehre Funktion zum Anfragen des Rick and Morty Charakters aus
let res = await rickAndMortyCharacters();

// Wenn Operation erfolgreich war
if (res.success) {
    // Uebergebe Charakterdaten an die entsprechende Renderfunktion
    renderCharacters(res.data);

} else {
    // Uebergebe die Fehlerdaten an die entsprechende Renderfunktion
    renderError(res.error);
}


function renderCharacters(charObj) {
    console.log(charObj);

    let charDiv = document.createElement('div');
    
    let charTitle = document.createElement('h3');
    charTitle.textContent = charObj.name;
    charDiv.appendChild(charTitle);

    let charPic = document.createElement('img');
    charPic.alt = charObj.name;
    charPic.src = charObj.image;
    charDiv.appendChild(charPic);

    document.querySelector('#app').appendChild(charDiv);
}


function renderError(errorObj) {
    console.log(errorObj);

    let errDiv = document.createElement('div');
    
    let errTitle = document.createElement('h3');
    errTitle.textContent = errorObj.errorCode;
    errDiv.appendChild(errTitle);

    let errMessage = document.createElement('p');
    errMessage.textContent = errorObj.message;
    errDiv.appendChild(errMessage);

    document.querySelector('#app').appendChild(errDiv);
}