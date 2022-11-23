// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
// Import any additional modules you want to include below \/
import { jsonRecipes } from './data.js';

// \/ All of your javascript should go here \/
// Wandle JSON-Repraesentation des Rezepte-Objekts in JS-Objekt um und speichere
let recipes = JSON.parse(jsonRecipes);

// Referenzen auf die SECTIONS
// let cakes = document.querySelector('#cakes');
// let biscuits = document.querySelector('#biscuits');
// let bread = document.querySelector('#bread');

// Erstelle Map aus dem Rueckgabewert von Object.entries(recipes)
let recipeMap = new Map(Object.entries(recipes));
// Durchlaufe alle Eintraege in der neuen Map
recipeMap.forEach((categoryRecipes, category) => {
  // Durchlaufe alle Rezepte der aktuellen Kategorie
  categoryRecipes.forEach(recipe => {
      // erstelle card fuer Rezept
      let card = createRecipeCard(recipe.title, recipe.author, recipe.image, recipe.ingredients);

      // haenge card an entsprechende section an
      document.querySelector(`#${category}`).appendChild(card);
  });
});

/* Object.entries(recipes).forEach(entry => {
    let category = entry[0];
    let categoryRecipes = entry[1];
    categoryRecipes.forEach(cakeRecipe => {
      // Erstelle fuer jedes Rezept eine Card
      let card = createRecipeCard(cakeRecipe.title, cakeRecipe.author, cakeRecipe.image, cakeRecipe.ingredients);
    
      let section = document.querySelector(`#${category}`);
      section.appendChild(card);
    });
}); */

/* for (let category in recipes) {
    recipes[category].forEach(cakeRecipe => {
        // Erstelle fuer jedes Rezept eine Card
        let card = createRecipeCard(cakeRecipe.title, cakeRecipe.author, cakeRecipe.image, cakeRecipe.ingredients);

        // Fuege neue card in entsprechende SECTION ein
        if (category === 'cakes') cakes.appendChild(card);
        if (category === 'biscuits') biscuits.appendChild(card);
        if (category === 'bread') bread.appendChild(card);
    });
} */

/* // Durchlaufe die Cakes-Rezepte
recipes.cakes.forEach(cakeRecipe => {
    // Erstelle fuer jedes Rezept eine Card
    let card = createRecipeCard(cakeRecipe.title, cakeRecipe.author, cakeRecipe.image, cakeRecipe.ingredients);
    
    // Fuege die neue Rezept-Card in die Cakes-Section ein
    document.querySelector('#cakes').appendChild(card);
});

// Durchlaufe die Biscuits-Rezepte
recipes.biscuits.forEach(cakeRecipe => {
  // Erstelle fuer jedes Rezept eine Card
  let card = createRecipeCard(cakeRecipe.title, cakeRecipe.author, cakeRecipe.image, cakeRecipe.ingredients);
  
  // Fuege die neue Rezept-Card in die Biscuits-Section ein
  document.querySelector('#biscuits').appendChild(card);
});

// Durchlaufe die Bread-Rezepte
recipes.bread.forEach(cakeRecipe => {
  // Erstelle fuer jedes Rezept eine Card
  let card = createRecipeCard(cakeRecipe.title, cakeRecipe.author, cakeRecipe.image, cakeRecipe.ingredients);
  
  // Fuege die neue Rezept-Card in die Bread-Section ein
  document.querySelector('#bread').appendChild(card);
}); */






function createRecipeCard(title, author, imgUrl, ingredients) {
    /* 
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://thecakeblog.com/wp-content/uploads/2017/01/chocolate-raspberry-cake-thumb-sm.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle text-muted">Card subtitle</h6>
          <hr class="mt-0 mb-1">
          <p class="card-text">Flour, Bakingpower, Sugar</p>
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
      </div>
      </div>
    */

    // Erstelle neues DIV-Element fuer die Card
    let card = document.createElement('div');
    // Fuege dem neuen Element die entsprechende Bootstrap-Klasse hinzu
    card.classList.add('card');
    // Fuege dem neuen Element noch ein Styling hinzu
    card.style.width = '18rem';

    // Erstelle neues IMG-Element fuer das Rezeptbild
    let cardImg = document.createElement('img');
    // Fuege dem neuen Element die entsprechende Bootstrap-Klasse hinzu
    cardImg.classList.add('card-img-top');
    // Fuege dem neuen Element noch ein Styling hinzu
    cardImg.style.maxWidth = '18rem';
    cardImg.style.height = '12rem';
    // Fuege den uebergebenen Titel des Rezept als ALT-Attribut des Bildes ein
    cardImg.alt = title;
    // Fuege die uebergebene IMG-Url des Rezepts als Quelle des Bildes ein
    cardImg.src = imgUrl;
    // Fuege IMG-Element der Card als Kind-Element hinzu
    card.appendChild(cardImg);

    // Erstelle neues DIV-Element fuer den Card-Body
    let cardBody = document.createElement('div');
    // Fuege dem neuen Element die entsprechende Bootstrap-Klasse hinzu
    cardBody.classList.add('card-body');
    // Fuege Card-Body der Card als Kind-Element hinzu
    card.appendChild(cardBody);

    // Erstelle neues H5-Element fuer den Card-Titel
    let cardTitle = document.createElement('h5');
    // Fuege dem neuen Element die entsprechende Bootstrap-Klasse hinzu
    cardTitle.classList.add('card-title');
    // Fuege den uebergebenen Titel des Rezepts als Text des Card-Titels ein
    cardTitle.textContent = title;
    // Fuege Card-Titel dem Card-Body als Kind-Element hinzu
    cardBody.appendChild(cardTitle);

    // Erstelle neues H6-Element fuer den Card-Subtitel
    let cardSubTitle = document.createElement('h6');
    // Fuege dem neuen Element die entsprechenden Bootstrap-Klassen hinzu
    cardSubTitle.classList.add('card-subtitle', 'text-muted');
    // Fuege den uebergebenen Autor des Rezepts als Text des Card-Subtitels ein
    cardSubTitle.textContent = author;
    // Fuege Card-Subtitel dem Card-Body als Kind-Element hinzu
    cardBody.appendChild(cardSubTitle);

    // Erstelle neues HR-Element als Trenner
    let seperator = document.createElement('hr');
    // Fuege dem neuen Element die entsprechenden Bootstrap-Klassen hinzu
    seperator.classList.add('mt-0', 'mb-1');
    // Fuege Trenner dem Card-Body als Kind-Element hinzu
    cardBody.appendChild(seperator);
    
    // Erstelle neues P-Element fuer die Zutatenliste
    let ingredientsList = document.createElement('p');
    // Fuege dem neuen Element die entsprechende Bootstrap-Klasse hinzu
    ingredientsList.classList.add('card-text');
    // Fuege zusammengesetzten String des ubergebenen Zutatenarrays
    // als Inhalt der Zutatenliste ein
    ingredientsList.textContent = ingredients.join(', ');

    // Zutatenliste als UL
    // let ingredientsList = document.createElement('ul');
    // ingredients.forEach(ingredient => {
    //     let listItem = document.createElement('li');
    //     listItem.classList.add('list-group-item');
    //     listItem.textContent = ingredient;
    //     ingredientsList.appendChild(listItem);
    // });

    // Fuege Zutatenliste dem Card-Body als Kind-Element hinzu
    cardBody.appendChild(ingredientsList);


    return card;
}