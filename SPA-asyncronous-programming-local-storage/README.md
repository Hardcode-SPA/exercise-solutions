
# SPA-ASYNCRONOUS-PROGRAMMING-LOCAL-STORAGE

Local storage allows developers to store and retrieve data in the browser. The data stored in local storage will not expire. This means the data will persist even if the tab or the browser window is closed.

[Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage?retiredLocale=it)

## What you will be doing.

We will fill out a form that will allow us to add data to our Local Storage, then we will create a button that will show the data in a table and one button for delete our saved data.

## Tasks

### Task 1 - Create a developer object

Create an event that is executed by clicking the button with ***id "send"*** that saves the values of all inputs creating an object ***"newDeveloper"*** having as keys: ***firstName***, ***lastName*** and ***ProgrammingLanguage***.

### Task 2 - Add object in the Local Storage

In the same event, create an item in the ***Local Storage*** that is an ***array***, add the "newDeveloper" object to this array.
Use the "console.log()" and the devtools Storage to help you.

### Task 3 - Clean Fields

When you click the button with ***id "send"*** you have to make the ***input fields empty***.

### Task 4 - Delete Local Storage Item

Use the button with ***id "reset"*** to create an event that ***deletes*** the item you created in the local sorage that contains the developers array.

### Task 5 - Display the developers

Display the developers with each value in the ***table***

## Bonus

### Task 6 - Real Time Data

Data should be shown in the table in ***real time***, adding and deleting you should not need to refresh the page.

### Task 7 - No empty fields

Create a condition that authorizes you to save the "newDeveloper" object ***if all fields have been filled in***.
Show a warning ***alert*** if at least one field is empty.

![JavaScript SPA-DOM-EVENT-BUBBLING beginners](./assets/local-storage.gif)
