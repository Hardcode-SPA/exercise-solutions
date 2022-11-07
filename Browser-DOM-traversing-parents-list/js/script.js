

/* 
function printParentChain(childElement) {
    // Beginne Eltern-Kette mit dem Namen des Startelements selbst
    let parentChain = childElement.nodeName.toLowerCase();

    // Laufvariable fuer Elternknoten
    let currentChildNode = childElement;

    // Durchlaufe alle Elternknoten bis zum hoechsten
    while (currentChildNode.parentElement !== null) {
        // Hole Elternknoten
        let parentNode = currentChildNode.parentElement;

        // Hole Namen des Elternknotens
        let parentNodeName = parentNode.nodeName.toLowerCase();

        // Haenge Namen des Elternknotens vorne an die Elternkette ran
        parentChain = parentNodeName + ' > ' + parentChain;

        // Setze Laufvariable auf Elternknoten
        currentChildNode = parentNode;
    }

    // Gebe fertige Elternkette als Rueckgabewert zurueck
    return parentChain;
}
 */

// Mit Klassennamen und IDs
function printParentChain(childElement) {
    // Starte Kette mit Namen des Kind-Elements selbst
    let parentChain = childElement.nodeName.toLowerCase();

    // Falls Kind-Element eine ID hat, hänge diese entsprechend an
    if (childElement.id !== '') parentChain += '#' + childElement.id;

    // Falls Kind-Element Klassen hat, hänge diese entsprechend an
    if (childElement.classList.length !== 0) {
        childElement.classList.forEach(className => parentChain += '.' + className);
    }

    // Laufvariable für die While-Schleife, um durch alle Elternknoten durchzulaufen
    let currentChildNode = childElement;

    // Durchlaufe Elternknoten bis zum höchsten Knoten
    while (currentChildNode.parentElement != null) {
        // Ermittle Elternknoten des aktuellen Kindknotens
        let parentNode = currentChildNode.parentElement;

        // Extrahiere Namen des Eltern-Elements
        let parentNodeName = parentNode.nodeName.toLowerCase();

        // Falls Eltern-Element ID hat, hänge diese entsprechend an
        if (parentNode.id !== '') parentNodeName += '#' + parentNode.id;

        // Falls Eltern-Element Klassen hat, hänge diese entsprechend an
        if (parentNode.classList.length !== 0) {
            parentNode.classList.forEach(className => {
                parentNodeName += '.' + className
            });
        }

        // Hänge endgültigen Namen des Eltern-Elements vorne an die Eltern-Kette an
        parentChain = parentNodeName + ' > ' + parentChain;

        // Wechsle Laufvariable auf Elternknoten
        currentChildNode = parentNode;
    }

    // Gebe Elternkette zurück
    return parentChain;
}

console.log(printParentChain(document.querySelector('cite')));