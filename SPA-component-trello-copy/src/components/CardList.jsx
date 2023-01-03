import React, { useState } from "react";
import Card from "./Card";

// Über die props kommen folgende Daten rein:
// -> cardListTitle: Der Titel der CardList, der oben als Überschrift der CardList verwendet wird
// -> cards: Das Array mit den Cards, die in der CardList gerendert werden sollen
// -> cardListId: Eindeutige ID der CardList zur Unterscheidung
// -> newCardHandler: Die Callbackfunktion der Elternkomponente App zum Hinzufügen neuer Cards in den State von App
function CardList(props) {
    // State-Variable u. -Setter für Indikator, ob Formular angezeigt wird oder nicht
    let [isFormOpen, setFormOpen] = useState(false);
    let [formInputValue, setFormInputValue] = useState('');
    let [isFormError, setFormError] = useState(false);

    // Handlerfunktion für die Add new card Schaltfläche
    function addCardHandler(evt) {
        setFormOpen(true);
    }

    // Handlerfunktion für den Abbruchsbutton des Formulars zum Hinzufügen neuer Cards
    function handleOnCancelClick(evt) {
        // Räume Formular auf und verstecke es
        setFormInputValue('');
        setFormError(false);
        setFormOpen(false);
    }

    // Handlerfunktion für die Eingabe in das Eingabefeld
    function handleInputChange(evt) {
        setFormInputValue(evt.target.value);

        // Wenn Eingabe nicht leer, schalte Fehleranzeige ab
        if (evt.target.value.trim().length > 0) {
            setFormError(false);
        }
    }

    // Submithandler für das Formular zum Anlegen einer neuen Card
    function handleFormSubmit(evt) {
        // Verhindere Standardverhalten des Browsers
        evt.preventDefault();

        // Extrahiere bereinigten Text aus dem State
        let newCardText = formInputValue.trim();

        if (newCardText.length < 1) {
            setFormInputValue('Please fill out the form before submitting...');
            setFormError(true);

        } else {
            // Rufe Callbackfunktion der Elternkomponente zum Hinzufügen neuer Cards auf
            props.newCardHandler(newCardText, props.cardListId);

            // Räume Formular auf und verstecke es
            setFormInputValue('');
            setFormError(false);
            setFormOpen(false);
        }
    }

    // Erstelle Array von Cards anhand der übergebenen card-Daten
    let cardElements = props.cards.map(card => {
        return <Card cardText={card.text} key={card.id}/>;
    });

    // Element für das Hinzufügeformular. Wird nur angezeigt, wenn isFormOpen true ist.
    let form = null;
    if (isFormOpen) {
        form =  <form onSubmit={handleFormSubmit} >
                    <input type="text" value={formInputValue} onChange={handleInputChange} className={isFormError ? 'error' : ''}/>
                    <button type="submit">Add</button>
                    <button type="button" onClick={handleOnCancelClick}>Cancel</button>
                </form>;
    }

    return (
        <div className="card-list">
            {/* Der Titel der CardList */}
            <h4 className="card-list-title">{props.cardListTitle}</h4>

            {/* Der Listenbereich für Cards */}
            <div className="card-list-scroller">
                {cardElements}
            </div>

            {/* Schaltfläche zum Öffnen des Hinzufügeformulars */}
            <span 
                className="card-list-add-span"
                onClick={addCardHandler}
            >Add another card</span>

            {/* Hinzufügeformular */}
            {form}
        </div>
    );
}


export default CardList;