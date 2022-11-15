

function init() {
    // Referenz auf aeusserstes UL mit der ID tree
    let tree = document.querySelector('#tree');

    // Referenz auf alle LIs im Baum
    let leafs = tree.querySelectorAll('li');

    // Durchlaufe alle LIs
    leafs.forEach(leaf => {
        // Erstelle neues SPAN-Element
        let span = document.createElement('span');
        
        // Fuege in das neue SPAN das Text-Element aus dem jeweiligen LI hinzu
        span.appendChild(leaf.firstChild);

        // Fuege vor an den Anfang des LIs das neue SPAN ein
        leaf.prepend(span);
    });

    // Registriere EventListener (click) an den ganzen Baum
    tree.addEventListener('click', evt => {
        // Early return wenn nich auf Span geklickt
        if (evt.target.tagName !== 'SPAN') return;

        // Hole entsprechende Subliste aus dem umgebenden LI
        let sublist = evt.target.parentNode.querySelector('ul');

        // Pruefe, ob sublist gefunden wurde
        if (sublist) {
            // toggle die hidden-Property
            sublist.hidden = !sublist.hidden;
        }
    });
}


window.addEventListener('load', evt => init());