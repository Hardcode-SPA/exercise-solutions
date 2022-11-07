// Hole body und aendere font
let body = document.querySelector('body');
body.style.fontFamily = 'Arial';

// Hole und zentriere das h1
let title = document.querySelector('.title');
title.style.textAlign = 'center';

// Hole alle Labels von der Klasse .category 
// und gebe ihnen andere Schriftfarbe sowie Schriftstyle
let categories = document.querySelectorAll('.category');
// categories.forEach(category => {
//     category.style.color = '#F00000';
//     category.style.fontStyle = 'italic';
//     category.style.fontSize = '2em';
// });

// Durch Destructuring im forEach-Callback-Parameter
// kann die explizite Angabe von .style weggelassen werden.
categories.forEach(({style: categoryStyle, innerText: categoryText}) => {
    categoryStyle.color = '#2F2F5F';
    categoryStyle.fontStyle = 'italic';
    categoryStyle.fontSize = '2em';

    console.log(categoryText);
});


function colorGenerator() {
    // Erstelle random Werte fuer alle vier RGBA Komponenten
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random().toFixed(1);

    // Gebe String mit rgba() CSS Funktion und eingesetzten Werten zurueck
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Hole ULs mit Klasse .food-category und weise jeder davon random Hintergrundfarbe zu
let foodLists = document.querySelectorAll('.food-category');
foodLists.forEach( ({style: ulStyle}) => {
    ulStyle.backgroundColor = colorGenerator();
    ulStyle.minWidth = '12em';
    ulStyle.padding = '2em';
});

// Hole main Container und setze ihn als Flexbox
let main = document.querySelector('main');
main.style.display = 'flex';
main.style.flexFlow = 'row wrap';
main.style.justifyContent = 'space-around';


// Definiere neues Media-Query aus JavaScript heraus
let desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

// Handler-Funktion zum Behandeln des Media-Query-Change Events
function handleViewportChange(mediaQueryEvt) {
    if (mediaQueryEvt.matches) {
        foodLists.forEach( ({style: ulStyle}) => {
            ulStyle.minWidth = '30em';
        });
    } else {
        foodLists.forEach( ({style: ulStyle}) => {
            ulStyle.minWidth = '12em';
        });
    }
}

// Haenge Handler-Funktion an Media-Query an change-Event an
desktopMediaQuery.addEventListener('change', handleViewportChange);

// Rufe Handler-Funktion ein mal initial auf
handleViewportChange(desktopMediaQuery);

// Hole warning-h3 mit .getElementById
let warning = document.getElementById('warning');
warning.style.fontSize = '20pt';
warning.style.textDecoration = 'underline';
warning.style.color = 'red';
warning.style.width = 'fit-content';

// Hole alle geraden LIs mit Klasse allergy-info
// und aendere die Hintergrundfarbe fuer diese
let allergyInfoItems = document.querySelectorAll('.allergy-info:nth-child(even)');
allergyInfoItems.forEach(({style: itemStyle}) => {
    itemStyle.backgroundColor = 'skyblue';
});

// Hole allergie-section und zentriere sie via Flexbox
let allergyWarningSection = document.querySelector('.allergy-warning');
allergyWarningSection.style.display = 'flex';
allergyWarningSection.style.flexDirection = 'column';
allergyWarningSection.style.alignItems = 'center';


// Hole food-desc sections und gebe ihnen Rahmen
let foodDescriptions = document.querySelectorAll('.food-desc');
console.log(foodDescriptions);
foodDescriptions.forEach(({style: foodDescStyle}) => {
    foodDescStyle.border = '5px orange solid';
    foodDescStyle.width = '6em';
    foodDescStyle.height = '6em';
    foodDescStyle.borderRadius = '50%';
    foodDescStyle.display = 'flex';
    foodDescStyle.justifyContent = 'center';
    foodDescStyle.alignItems = 'center';
});


// Hole footer und mache ihn zu Flexbox
let footer = document.querySelector('.footer');
footer.style.display = 'flex';
footer.style.flexDirection = 'column';
footer.style.justifyContent = 'center';
footer.style.alignItems = 'center';
footer.style.gap = '2em';
footer.style.flexWrap = 'wrap';


// Definiere neues Media-Query aus JavaScript heraus
let footerMediaQuery = window.matchMedia('(min-width: 1024px)');

// Handler-Funktion zum Behandeln des Media-Query-Change Events
function handleFooterViewportChange(mediaQueryEvt) {
    if (mediaQueryEvt.matches) {
        footer.style.flexDirection = 'row';
    } else {
        footer.style.flexDirection = 'column';
    }
}

// Haenge Handler-Funktion an Media-Query an change-Event an
footerMediaQuery.addEventListener('change', handleFooterViewportChange);

// Rufe Handler-Funktion ein mal initial auf
handleFooterViewportChange(footerMediaQuery);