// user strict fuer strengere Codeausfuehrung (silent errors werden zu echten errors)
'use strict';

// userList MUSS deklariert werden
let userList = ['Maxim', 'Necip', 'Shaniqua', 'Lucas', 'Adam'];

// beim Nutzen der Variablen aufpassen, was man da tippt
// Copy/Paste hilft da ungemein
userList.forEach((user, index, userList) => {
    renderUser(user, index, userList);
});

// beim Nutzen der Variablen aufpassen, was man da tippt
// Copy/Paste hilft da ungemein
function renderUser(name, index, userList) {
    console.log(name, index, userList);
}