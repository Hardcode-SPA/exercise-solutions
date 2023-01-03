import React, { useState } from 'react';
import CardList from './components/CardList';

const productBacklog = [
    {
        id: 1,
        text: 'FrontEnd'
    },
    {
        id: 2,
        text: 'Finished page - for Cluster'
    },
    {
        id: 3,
        text: 'Frontend - Branch / Cluster / Question page setup'
    },
    {
        id: 4,
        text: 'Backend'
    },
    {
        id: 5,
        text: 'Coffee bean Tree Theme'
    },
    {
        id: 6,
        text: 'AJAX for each templates'
    },
    {
        id: 7,
        text:
            'Write instruction & Make questions based on the Virtual Tree and Repo classes.'
    },
    {
        id: 8,
        text: 'JUnit transition into Mockito lesson'
    },
    {
        id: 9,
        text: 'Mockito'
    },
    {
        id: 10,
        text: 'Display graduation page of newly blossomed Java tree'
    },
    {
        id: 11,
        text: 'finished tree html page ???????'
    },
    {
        id: 12,
        text: 'JavaScript'
    },
    {
        id: 13,
        text: 'JavaScript Testing'
    },
    {
        id: 14,
        text: '"Course" change to tree or to cluster'
    },
    {
        id: 15,
        text: '(Low priority) - About Me page setup and styling'
    },
    {
        id: 16,
        text: 'Responsive Design'
    },
    {
        id: 17,
        text: 'User profile entity'
    }
];

const parkingLot = [
    {
        id: 1,
        text:
            'Home page: Google Log In/Github API ---Update: Have Google Cloud account for this'
    },
    {
        id: 2,
        text:
            'Screenshots of steps needed to setup test class w/annotation & imports'
    },
    {
        id: 3,
        text: 'blank templates of Java/ Spring/ CSS / JS / HTML'
    },
    {
        id: 4,
        text: 'hide radio button?'
    },
    {
        id: 5,
        text: 'pop up that page is completed'
    }
];

const testChildren = [
    {
        id: 1,
        text:
            'Home page: Google Log In/Github API ---Update: Have Google Cloud account for this'
    },
    {
        id: 2,
        text:
            'Screenshots of steps needed to setup test class w/annotation & imports'
    },
];

const listOfCards = [
    {
        id: 1,
        title: 'Parking Lot',
        children: parkingLot
    },
    {
        id: 2,
        title: 'Product Backlog',
        children: productBacklog
    },
    {
        id: 3,
        title: 'Testikus',
        children: testChildren
    }
];

export default function App() {
    // State-Variablen und -Setter für die beiden Card-Arrays
    // let [productBacklogCards, setProductBacklogCards] = useState(productBacklog);
    // let [parkingLotCards, setParkingLotCards] = useState(parkingLot);

    // State-Variable und -Setter für das Array der CardList Objekte
    let [cardLists, setCardLists] = useState(listOfCards);


    // // Funktion zum Hinzufügen neuer Cards in den Datensatz im State
    // function addNewCard(cardText, cardListId) {
    //     if (cardListId === 1) {
    //         // Erstelle neue Card für den Datensatz im State
    //         let newCard = {
    //             id: parkingLotCards.length+1, // TODO finde besseren Weg für ID Vergabe
    //             text: cardText
    //         };

    //         // Konkatiniere bestehendes Array aus dem State mit einem neuen und setze es als neues im State
    //         setParkingLotCards(parkingLotCards.concat([newCard]));

    //     } else {
    //         // Erstelle neue Card für den Datensatz im State
    //         let newCard = {
    //             id: productBacklogCards.length+1, // TODO finde besseren Weg für ID Vergabe
    //             text: cardText
    //         };

    //         // Konkatiniere bestehendes Array aus dem State mit einem neuen und setze es als neues im State
    //         setProductBacklogCards(productBacklogCards.concat([newCard]));
    //     }
    // }


    // Funktion zum Hinzufügen neuer Cards in den Datensatz im State
    function addNewCard(cardText, cardListId) {
        // Finde Entsprechendes CardList Objekt anhand der ID
        let cardList = cardLists.find(elem => {
            return elem.id === cardListId;
        });


        // Erstelle neue Card für den Datensatz im State
        let newCard = {
            id: cardList.children[cardList.children.length-1].id + 1, // Neue ID: Zähle ID des letzten Elements um 1 hoch
            text: cardText
        };

        // Füge neue Card dem entsprechenden Array von Card Objekten hinzu
        cardList.children.push(newCard);

        // Setze Wert der State-Variable neu: Kopie des Bestehenden Wertes (Fühlt sich besser an als einfach das gleiche)
        setCardLists([...cardLists]);
    }

    // Erstelle neues Array von CardList Elementen
    let cardListElements = cardLists.map(cardList => {
        // Erstelle neues CardList Element für jedes Objekt
        return  <CardList 
                    cardListTitle={cardList.title}
                    cards={cardList.children}
                    cardListId={cardList.id}
                    newCardHandler={addNewCard}
                    key={cardList.id}
                />
    });

    return (
        <div>
            <h1>Trello Board</h1>
            <div className='card-list-container'>
                {/* <CardList 
                    cardListTitle="Parking Lot"
                    cards={parkingLotCards}
                    cardListId={1}
                    newCardHandler={addNewCard}
                />

                <CardList 
                    cardListTitle="Product Backlog"
                    cards={productBacklogCards}
                    cardListId={2}
                    newCardHandler={addNewCard}
                /> */}

                {/* Array der CardList Elemente */}
                {cardListElements}
            </div>
        </div>
    )
};
