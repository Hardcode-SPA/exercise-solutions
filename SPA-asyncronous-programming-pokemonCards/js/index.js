import { fetchByName } from './data.js';

// let pokeData = await fetchByName('pikachu');
let pokeData = await fetchByName('peter pan');

if ( !pokeData ) {
    new bootstrap.Toast(document.querySelector('.toast')).show();
}
console.log(pokeData);