let allPokemon = [];

async function fetchAll() {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=-1');

        // Wenn Antwort-Status 404 ist, werfe Fehler fuer nicht gefunden
        if ( response.status === 404 ) throw new Error('Not found');
        // Wenn Antwort-Status nicht 200 ist, werfe allgemeinen Fehler
        if ( !response.ok ) throw new Error('Error occured');

        // Wandle erhaltenen Datensatz in JS-Objekt um
        let body = await response.json();

        console.log(body.results);

        allPokemon = body.results;
    } catch (error) {
        
    }
}

function findAllMatchingByName(query) {
    if (query.trim().length === 0) return [];
    
    return allPokemon.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
}

// Funktion zum Abrufen eines Pokemon-Datensatzes von der PokeAPI
async function fetchByName(name) {
    // Versuche
    try {
        // Fetch auf die pokemon-Route mit dem uebergebenen Suchstring
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
        
        // Wenn Antwort-Status 404 ist, werfe Fehler fuer nicht gefunden
        if ( response.status === 404 ) throw new Error('Not found');
        // Wenn Antwort-Status nicht 200 ist, werfe allgemeinen Fehler
        if ( !response.ok ) throw new Error('Error occured');
        
        // Wandle erhaltenen Datensatz in JS-Objekt um
        let body = await response.json();
        console.log(body);

        // Gebe custom Pokemon Objekt zurueck
        return {
            name: body.name,
            img: body.sprites.front_default,
            stats: body.stats.map(stat => {
                return {
                    name: stat.stat.name,
                    score: stat.base_stat
                };
            }),
            abilities: body.abilities.map(ability => {
                return ability.ability.name
            })
        };

    } catch (error) { // Fange Fehler ab
        console.log(error);

        // Gebe null zurueck, sodass Aufrufer weiss, dass Fehler entstanden ist
        return null;
    }
}

export { fetchByName, fetchAll, findAllMatchingByName };