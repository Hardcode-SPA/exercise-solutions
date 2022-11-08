const wrapper = document.querySelector('#wrapper');



// Aufgabe 1
// Funktion zum Ausgeben der Kind-Elemente und der Kindeskind-Elemente
function printChildrenAndCount(element) {
    console.log('Elements children:');
    // Gebe Kind-Elemente des übergebenen Elements in die Konsole aus
    console.log(element.children);
    // Gebe Anzahl Kind-Elemente des übergebenen Elements in die Konsole aus
    console.log(`Elements childrenCount: ${element.childElementCount}`);


    // Mache aus HTMLCollection (element.children) ein Array via Array.from()
    // Iteriere über die Kind-Elemente von element
    Array.from(element.children).forEach(child => {
        // Gebe Tagnamen des Kind-Elements in die Konsole aus
        console.log(`\tChild: ${child.tagName}:`);
        console.log('\t\tChilds children:');
        // Gebe HTMLCollection der Kindeskind-Elemente des Kind-Elements aus
        console.log('\t\t', child.children);
        // Gebe Länge der HTMLCollection als Anzahl der Kindeskind-Elemente aus
        console.log(`\t\tChilds childrenCount: ${child.children.length}`);
    });
}

printChildrenAndCount(wrapper);


// Aufgabe 2
// Funktion zum Ermitteln des Kind-Elements mit den meisten Klassen
function getChildWithMostClasses(element) {
    // Speichere HTMLCollection der Kind-Elemente zwischen
    let children = element.children;

    // Erstelle Rückgabeobjekt, das das Element mit den meisten Klassen enthält
    // sowie die Anzahl dieser Klassen
    let result = {
        element: null,
        numberOfClasses: 0
    };

    // Mache aus HTMLCollection (element.children) ein Array via Array.from()
    // Iteriere über die Kind-Elemente von element
    Array.from(children).forEach(child => {
        // Prüfe, ob Länge der classList des jeweiligen Kind-Elements größer
        // als die bisher gespeicherte Anzahl der meisten Klassen (result.numberOfClasses) ist
        if (child.classList.length > result.numberOfClasses) {
            // Speichere aktuelles Kind-Element im Ergebnisobjekt
            // als Element mit den meisten Klassen
            result.element = child;
            // Überschreibe Anzahl der meisten Klassen im Ergebnisobjekt
            // mit der Anzahl der Klassen des aktuellen Kind-Elements
            result.numberOfClasses = child.classList.length;
        }
    });

    return result;
}

console.log(getChildWithMostClasses(wrapper));




// Das Prinzip des Suchens nach dem groessten irgendwas
let sackVollerAepfel = [
    {
        name: 'apfel1',
        groesse: 1
    },
    {
        name: 'apfel2',
        groesse: 4
    },
    {
        name: 'apfel3',
        groesse: 12
    },
    {
        name: 'apfel4',
        groesse: 2
    },
];


function findeGroesstenApfel(apfelSack) {
    let ergebnis = {
        groessterApfel: null,
        groessteGroesse: 0
    };

    for (let apfelIndex = 0; apfelIndex < apfelSack.length; apfelIndex++) {
        let apfel = apfelSack[apfelIndex];

        if (apfel.groesse > ergebnis.groessteGroesse) {
            ergebnis.groessterApfel = apfel;
            ergebnis.groessteGroesse = apfel.groesse;
        }
    }

    return ergebnis;
}

console.log(findeGroesstenApfel(sackVollerAepfel));