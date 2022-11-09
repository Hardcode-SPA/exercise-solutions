let mario = document.querySelector('#mario');
let imgMario = document.querySelector('#mario > img');
imgMario.src = 'assets/mario-stand.gif';


// Funktion zum Anhalten der Mario-Geh-Animation
function stopMario(keyEvt) {
    imgMario.src = 'assets/mario-stand.gif';
}


function resetMario() {
    // Setze Mario-Div Abstand nach links zurueck
    mario.style.left = '0px';
    // Setze Bildrotation zurueck
    mario.style.transform = 'rotateY(0)';
}

function moveMario(keyEvt) {
    // Ermittle gedrueckte Taste
    let keyName = keyEvt.key;

    // Pruefe, ob eine der Pfeiltasten (links, rechts) gedrueckt wurde
    if ((keyName === 'ArrowRight') || (keyName === 'ArrowLeft')) {
        // Verstecke Hinweisbox
        hintbox.style.visibility = 'hidden';

        // Wenn imgMario nicht bereits das mario-walk.gif enthaelt, setze es als src davon
        if ( !imgMario.src.includes('mario-walk.gif') ) imgMario.src = 'assets/mario-walk.gif';
    
        // Ermittle derzeitigen linksseitigen Abstand des divs
        let currLeft = parseInt(mario.style.left);
        if (isNaN(currLeft)) currLeft = 0;
        console.log('currLeft', currLeft);

        // Gehe rechts
        if (keyName === 'ArrowRight') {
            // Pruefe, ob Mario-Div ueber Fensterrand hinaus ist
            if (currLeft >= window.innerWidth) {
                // Setze Mario-Div auf linke Seite zurueck
                mario.style.left = '-140px';
            
            } else {
                // Erhoehe linksseitigen Abstand des Divs um 10px
                mario.style.left = currLeft + 10 + 'px';
            }
            // Setze vertikale Rotation des Bildes zurueck (mario guckt nach rechts)
            mario.style.transform = 'rotateY(0)';

        } else { // gehe links
            // Pruefe, ob Mario-Div ueber Fensterrand hinaus ist
            if (currLeft <= -140) {
                // Setze Mario-Div auf rechte Seite zurueck
                mario.style.left = window.innerWidth + 'px';
            
            } else {
                // Reduziere linksseitigen Abstand des Divs um 10px
                mario.style.left = currLeft - 10 + 'px';
            }
            // Rotiere das Bild vertikal um 180 Grad (mario guckt nach links)
            mario.style.transform = 'rotateY(-180deg)';
        }
    } else if (keyName === 'Home') { // Wenn Home bzw. Pos1 Taste gedrueckt wurde
        // Setze Mario zurueck
        resetMario();

    } else {
        // Falsche Taste, zeige Hilfe an
        hintbox.style.visibility = 'visible';
    }
}

// Haenge Listener an Key-Events an
document.addEventListener('keydown', moveMario);
document.addEventListener('keyup', stopMario);