


// Init-Function, die bei abgeschlossenem Laden der Page ausgefuehrt wird
function init() {
    // Referenz auf das Container-Div
    let container = document.querySelector('#container');
    
    // Registriere EventListener (click) auf container
    container.addEventListener('click', evt => {
        // Pruefe, ob evt.target (das Element, das das Event ausgeloest hat)
        // der Button zum Loeschen der Panes ist
        if (evt.target.classList.contains('remove-button')) {
            // Hole Referenz auf entsprechendes pane
            let pane = evt.target.closest('.pane');

            // Loesche das entsprechende pane aus dem container
            // evt.currentTarget.removeChild(pane);
            pane.remove();
        }
    });
}

// Registriere EventListener (load) am window, der die Init-Function aufruft
window.addEventListener('load', evt => init());