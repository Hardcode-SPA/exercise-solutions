


async function fetchByName(name) {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
        
        if ( !response.ok ) throw new Error('Not found');
        
        let body = await response.json();
        console.log(body);

        return {
            name: body.name,
            img: body.sprites.front_default,
            stats: body.stats.map(stat => {
                return {
                    name: stat.stat.name,
                    score: stat.base_stat
                };
            }),
            abbilities: body.abilities.map(ability => {
                return ability.ability.name
            })
        };
    } catch (error) {
        console.log(error);

        return null;
    }
}

export { fetchByName };