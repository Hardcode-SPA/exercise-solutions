const books = [
  {
    title: "The Design of EveryDay Things",
    author: "Don Norman",
    alreadyRead: false,
    img:
      "http://t2.gstatic.com/images?q=tbn:ANd9GcTQEZhxiVNZAeKa1dGfEzKwLXiyY_78i08Gfhwn53k-JYin9TDO"
  },
  {
    title: "The Most Human Human",
    author: "Brian Christian",
    alreadyRead: true,
    img:
      "http://t2.gstatic.com/images?q=tbn:ANd9GcRqNE0qeS4ldVIC9DbGkx9MOwJ4WWKi6HVvtrtZ8XTKVodonSBy"
  },
  {
    title: "Thinking with Type",
    author: "Ellen Lupton",
    alreadyRead: true,
    img:
      "https://images-na.ssl-images-amazon.com/images/I/518%2BxIiELFL._SX258_BO1,204,203,200_.jpg"
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    alreadyRead: false,
    img: "https://eloquentjavascript.net/img/cover.jpg"
  },
  {
    title: 'In de startblokken',
    author: 'Margaret Van der Kamp',
    alreadyRead: true,
    img: 
      'https://www.coutinho.nl/media/catalog/product/cache/8964fb55872be203e9c33038b4700eb4/9/7/9789046906620_3d.png'
  }
];

// Hole Referenz auf Liste der Buecher (ul)
const bookListContainer = document.querySelector('.book-list');

// Funktion zum Erstellen von bookCards
// returnt fertiges HTML-Element mit übergebenen Daten
function createBookCard(title, author, imgUrl, alreadyRead) {
  /* ---------------------- Card Container ---------------------- */
  // Erstelle äußerstes div für die Buch-Card
  let cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'book');

  /* ---------------------- Card Inhalt ---------------------- */
  // Erstelle image-Element für Buchcover
  let bookCoverImg = document.createElement('img');
  bookCoverImg.classList.add('card-img-top', 'book-cover');
  bookCoverImg.setAttribute('src', imgUrl);
  bookCoverImg.setAttribute('alt', `Buchcover des Buchs ${title} vom Author ${author}`);

  /* ----------------- Card Body ----------------- */
  // Erstelle div-Element für Card-Body in dem sich die Buchinfos befinden sollen
  let cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  // Erstelle p-Element für Card-Body in dem sich der Buchtitel befinden soll
  let titleParagraph = document.createElement('p');
  titleParagraph.classList.add('card-text');
  titleParagraph.innerText = title;

  // Erstelle span-Element für Card-Body in dem sich der Name des Buchauthors befinden soll
  let authorSpan = document.createElement('span');
  authorSpan.classList.add('text-muted', 'small');
  authorSpan.innerText = author;

  /* ----------------- Card Footer ----------------- */
  // Erstelle div-Element für Card-Footer in dem sich das Lesestatus-Badge befinden soll
  let cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer', 'd-flex', 'justify-content-end', 'py-3');

  // Erstelle span-Element für Card-Footer, dass anzeigt, ob das Buch bereits gelesen wurde
  let readingStatusSpan = document.createElement('span');
  // Wähle abhängig von Lesestatus Bootstrapklasse für Hintergrundfarbe des Badge
  let readingStatusBadgeClass = alreadyRead ? 'bg-success' : 'bg-secondary';
  readingStatusSpan.classList.add('badge', 'rounded-pill', readingStatusBadgeClass, 'status');
  // Setze abhängig von Lesestatus den Text des Badges
  readingStatusSpan.innerText = alreadyRead ? 'Read' : 'To read';


  /* ----------------- Zusammensetzung ----------------- */
  // -------- Innerste zuerst
  // cardBody
  cardBody.appendChild(titleParagraph);
  cardBody.appendChild(authorSpan);

  // cardFooter
  cardFooter.appendChild(readingStatusSpan);

  // -------- Äußere in die Card
  cardDiv.appendChild(bookCoverImg);
  cardDiv.appendChild(cardBody);
  cardDiv.appendChild(cardFooter);

  
  // Gebe fertiges cardDiv als Rückgabewert zurück
  return cardDiv;
}

// Drehe uebergebenen Namen um und trenne Nachname per Komma von Vorname
function reverseName(authorName) {
  // Zerlege Authornamen in Einzelteile
  let transformedAuthorNameParts = authorName.split(' ');
  // Extrahiere Vorname
  let firstName = transformedAuthorNameParts[0];
  // Extrahiere Nachname (kann auch aus mehreren Worten bestehen)
  let lastName = transformedAuthorNameParts.slice(1).join(' ');
  // Setze Namen in richtiger Form zusammen (Nachname, Vorname)
  let transformedAuthor = `${lastName}, ${firstName}`;

  return transformedAuthor;
}

// Erstellt nach Nachname sortierte Kopie des uebergenen Arrays
function sortByLastName(books) {
  // Sortiere nach Nachnamen
  return books.sort( (bookA, bookB) => reverseName(bookA.author).localeCompare(reverseName(bookB.author)));
}


// Durchlaufe alle Bucheinträge
sortByLastName(books).forEach( book => {
  // Bringe Namen in richtige Form
  let transformedAuthor = reverseName(book.author);

  // Erstelle neue bookCard anhand der Buchinformationen aus dem book Objekt
  let bookCard = createBookCard(book.title, transformedAuthor, book.img, book.alreadyRead);
  
  // Erstelle neues List-Item für die ungeordnete Buchliste
  let bookListItem = document.createElement('li');
  // Hänge erstelle bookCard als Kind-Element an List-Item an
  bookListItem.appendChild(bookCard);

  // Hänge fertiges List-Item an ungeordnete Buchliste an
  bookListContainer.appendChild(bookListItem);
});



















/* // function to create book card
function createBookCard(bookCoverUrl, title, author, isRead) {
  // Erstelle Card-Element fuer Buch
  let bookCard = document.createElement('div');
  bookCard.classList.add('card', 'book', 'mb-3');

  // create book cover img element
  let bookCoverImg = document.createElement('img');
  bookCoverImg.classList.add('card-img-top', 'book-cover');
  bookCoverImg.setAttribute('src', bookCoverUrl);

  // create card-body
  let bookCardBody = document.createElement('div');
  bookCardBody.classList.add('card-body');

  // create card-body-text
  let bookTitle = document.createElement('p');
  bookTitle.classList.add('card-text', 'fs-5');
  bookTitle.innerText = title;

  // create author-span
  let bookAuthor = document.createElement('span');
  bookAuthor.classList.add('text-muted', 'small');
  bookAuthor.innerText = author;
  
  // create card-footer
  let cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer', 'd-flex', 'justify-content-end', 'py-3');

  // create span for reading status
  let readingStatusSpan = document.createElement('span');
  readingStatusSpan.classList.add('badge', 'rounded-pill', (isRead ? 'bg-success' : 'bg-secondary'), 'status');
  readingStatusSpan.innerText = isRead ? 'Read' : 'To read';


  // add bookTitle to card-body
  bookCardBody.appendChild(bookTitle);
  // add bookAuthor to card-body
  bookCardBody.appendChild(bookAuthor);
  // add span to cardFooter
  cardFooter.appendChild(readingStatusSpan);


  // add image to card
  bookCard.appendChild(bookCoverImg);
  // add card-body to card
  bookCard.appendChild(bookCardBody);
  // add card-footer to card
  bookCard.appendChild(cardFooter);

  return bookCard;
}

// Sort object based on surname, use String.prototype.localeCompare for managing case and special accents
books.sort((a, b) => {
  const surnameA = a.author.split(' ').reverse().join(', ');
  const surnameB = b.author.split(' ').reverse().join(', ');
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  return surnameA.localeCompare(surnameB);
});

// create cards for all books and append to book list
books.forEach(book => {
  let bookListItem = document.createElement('li');
  let customAuthor = book.author.split(' ').reverse().join(', ');
  bookListItem.appendChild(createBookCard(book.img, book.title, customAuthor, book.alreadyRead));

  bookListContainer.append(bookListItem);
}); */