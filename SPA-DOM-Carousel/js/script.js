// Zaehler aktuelles Bild
let currentIndex = 0;

/* Init-Funktion, die nach fertigem Laden der Page ausgefuehrt wird */
function init() {
    // Referenzen auf noetigen HTML-Elemente
    let leftSlider = document.querySelector('.slide-left');
    let rightSlider = document.querySelector('.slide-right');
    let imgContainers = document.querySelectorAll('.img-container');

    // Durchlaufe alle Bild-Container und fuege ihnen ein Hintergrundbild hinzu
    imgContainers.forEach((img, index) => {
        // Setze random Bild von picsum.photos als Hintergrund
        img.style.backgroundImage = `url(https://picsum.photos/1920/1080?random=${index})`;
    });

    // Fuege dem Schalter zum nach links sliden, den EventListener hinzu
    leftSlider.addEventListener('click', evt => {    
        // finde naechsten index
        let nextIndex = currentIndex-1;
    
        // Wenn Folgeindex 0 nicht unterschreitet
        if (nextIndex >= 0) {
            // Entferne alle bereits vergebenen Animationklassen von allen Bildern
            imgContainers.forEach(img => {
                img.classList.remove('slide-out-right', 'slide-out-left', 'slide-in-right','slide-in-left');
            });

            // Aktuelles Bild raussliden
            imgContainers[currentIndex].classList.add('slide-out-right');

            // lasse naechstes Bild reinsliden
            imgContainers[nextIndex].classList.add('slide-in-left');

            // Setze aktuellen Index neu
            currentIndex = nextIndex;
        }
    });
    
    // Fuege dem Schalter zum nach rechts sliden, den EventListener hinzu
    rightSlider.addEventListener('click', evt => {
        // finde naechsten index
        let nextIndex = currentIndex+1;

        // Wenn Folgeindex maximale Anzahl von Bildern ueberschreitet
        if (nextIndex <= imgContainers.length-1) {
            // Entferne alle bereits vergebenen Animationklassen von allen Bildern
            imgContainers.forEach(img => {
                img.classList.remove('slide-out-right', 'slide-out-left', 'slide-in-right','slide-in-left');
            });

            // Aktuelles Bild raussliden
            imgContainers[currentIndex].classList.add('slide-out-left');

            // lasse naechstes Bild reinsliden
            imgContainers[nextIndex].classList.add('slide-in-right');

            // Setze aktuellen Index neu
            currentIndex = nextIndex;
        }
    });

    // Lasse erstes Bild von rechts reinsliden
    imgContainers[0].classList.add('slide-in-right');
}



// Fuehre init-Funktion aus, wenn Page geladen
window.addEventListener('load', evt => init());
