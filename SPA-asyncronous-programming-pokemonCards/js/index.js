import { fetchByName, fetchAll, findAllMatchingByName } from './data.js';

// Hole alle Pokemon Eintraege in Kurzform
fetchAll();

// Hole Suchformular
let searchForm = document.querySelector('#search-pokemon-form');
// Haenge submit-Handler an Eingabefeld an
searchForm.addEventListener('submit', handleSearchSubmit);
// Hole Suchvorschlagsliste
let suggestions = searchForm.querySelector('ul');

// Haenge input-Handler an Eingabefeld an
searchForm.addEventListener('input', evt => {
    let query = evt.target.value.trim();

    let results = findAllMatchingByName(query);

    console.log(findAllMatchingByName(query));

    // Mache aus den ersten 10 Eintraegen list items
    let suggestionItems = results.slice(0, 9).map(result => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.textContent = capitalize(result.name);
        listItem.addEventListener('click', evt => {
            performSearch(result.name);
        });
        return listItem;
    });

    console.log(suggestions);

    suggestions.replaceChildren(...suggestionItems);
});


async function performSearch(searchQuery) {
    // Hole Spinner und zeige an
    let spinner = document.querySelector('#query-spinner');
    spinner.classList.toggle('visually-hidden');

    // Hole Pokemon Card und verstecke ggf.
    let pokemonCard = document.querySelector('#pokemon-card');
    if (!pokemonCard.classList.contains('visually-hidden')) {
        pokemonCard.classList.toggle('visually-hidden');
    }

    // Starte und erwarte Suchanfrage
    let pokeData = await fetchByName(searchQuery);

    // Verstecke Spinner wieder
    spinner.classList.toggle('visually-hidden');

    // Wenn Suchanfrage null liefert
    if ( !pokeData ) {
        // Zeige Fehlertoast an
        let newToast = createToast('Error', 'No such pokemon found!');
        document.querySelector('.toast-container').appendChild(newToast);
        new bootstrap.Toast(newToast).show();

        // Early return
        return;
    }

    // Setze Suchformular zurueck
    resetSearchForm();

    // Daten sind da -> Befuelle Pokemon Card und zeige sie an
    fillPokeCard(pokeData);
    pokemonCard.classList.toggle('visually-hidden');
}

async function handleSearchSubmit(evt) {
    evt.preventDefault();

    // Extrahiere Suchbegriff
    let searchQuery = evt.target.querySelector('input').value.toLowerCase();
    // Pruefe, ob Suchbegriff gueltig
    if (searchQuery.trim().length <= 0) {
        // Zeige Fehler Toast an
        let newToast = createToast('Error', 'Your query was empty...');
        document.querySelector('.toast-container').appendChild(newToast);
        new bootstrap.Toast(newToast).show();

        // early return
        return;
    }

    // Fuehre den Suchvorgang durch
    performSearch(searchQuery);
}

function fillPokeCard(pokeData) {
    let pokemonCard = document.querySelector('#pokemon-card');

    let pokemonTitle = pokemonCard.querySelector('h3');
    pokemonTitle.textContent = pokeData.name;
    
    let pokemonImg = pokemonCard.querySelector('img');
    pokemonImg.alt = pokeData.name;
    pokemonImg.src = pokeData.img;

    let pokemonStats = pokemonCard.querySelector('#poke-stats');
    pokemonStats.replaceChildren();
    pokeData.stats.forEach(stat => {
        let statItem = document.createElement('li');
        statItem.classList.add('list-group-item', 'bg-dark', 'text-light');
        statItem.textContent = `${stat.name}: ${stat.score}`;
        pokemonStats.appendChild(statItem);
    });

    let pokemonAbilities = pokemonCard.querySelector('#poke-abilities');
    pokemonAbilities.replaceChildren();
    pokeData.abilities.forEach(ability => {
        let abilityItem = document.createElement('li');
        abilityItem.classList.add('list-group-item', 'bg-dark', 'text-light');
        abilityItem.textContent = ability;
        pokemonAbilities.appendChild(abilityItem);
    });
}

function createToast(title, message) {
    
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    let toastHeader = document.createElement('div');
    toastHeader.classList.add('toast-header');
    toast.appendChild(toastHeader);

    let toastIcon = document.createElement('div');
    toastIcon.classList.add('me-1');
    toastIcon.style.width = '20px';
    toastIcon.style.height = '20px';
    toastIcon.style.backgroundColor = '#ff0000BB';
    toastIcon.style.borderRadius = '5px';
    toastHeader.appendChild(toastIcon);

    let toastTitle = document.createElement('strong');
    toastTitle.classList.add('me-auto');
    toastTitle.textContent = title;
    toastHeader.appendChild(toastTitle);

    let toastTimestamp = document.createElement('small');
    toastTimestamp.classList.add('text-muted');
    toastTimestamp.textContent = 'just now';
    toastHeader.appendChild(toastTimestamp);

    let toastCloseBtn = document.createElement('button');
    toastCloseBtn.classList.add('btn-close');
    toastCloseBtn.setAttribute('data-bs-dismiss', 'toast');
    toastCloseBtn.setAttribute('aria-label', 'Close');
    toastHeader.appendChild(toastCloseBtn);

    let toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.textContent = message;
    toast.appendChild(toastBody);

    return toast;
}


function resetSearchForm() {
    searchForm.querySelector('input').value = '';
    suggestions.replaceChildren();
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}