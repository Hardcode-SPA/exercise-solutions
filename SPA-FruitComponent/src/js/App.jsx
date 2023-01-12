import { useState } from 'react';
import '../scss/App.scss';
import Fruit from './components/Fruit';

function App() {
  // Zustandsvariable und ihr Setter fuer ein Array von Fruchtnamen
  let [fruits, setFruits] = useState(['Apple', 'Mango', 'Banana', 'Lemon']);

  // Callback zum Loeschen von Fruchtnamen aus der Statevariable
  // anhand eines uebergebenen Fruchtnamen
  function removeComponent(fruitName) {
    // Kopie des Arrays aus dem State
    let fruitsCopy = [...fruits];

    // Finde Index des gesuchten Elements anhand eines Wertevergleichs
    let fruitIndex = fruitsCopy.findIndex(fruit => fruit === fruitName);

    // Loesche entsprechendes Element aus der Arraykopie
    fruitsCopy.splice(fruitIndex, 1);

    // Setze veraenderte Arraykopie in den State ein
    setFruits(fruitsCopy);
  }

  // Erstelle Array von Fruit-Komponenten fuer jeden Fruchtnamen der Statevariable
  let fruitElems = fruits.map(fruit => {
    // Erstelle neue Fruit Komponente und uebergebe ihr den entsprechenden Namen
    // sowie ein Callback zum loeschen des entsprechenden Fruchtnamen im State
    return <Fruit key={fruit} name={fruit} deleteCallback={removeComponent} />;
  });

  return (
    <div className="App">
      <div className='container mx-auto'>
        <h1 className='text-4xl text-center py-9'>Fruits</h1>
        {fruitElems}
      </div>
    </div>
  );
}

export default App;
