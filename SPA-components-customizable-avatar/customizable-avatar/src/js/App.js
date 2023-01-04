
import { useState } from 'react';
import '../css/App.css';
import picture from '../assets/Will_code_html_for_food.jpg';
import Avatar from './components/Avatar';

// Funktion zum Importieren aller Bilder aus einem Context (einem Ordner)
function importAll(context) {
  return context.keys().map(context);
}

// Hole alle Bilderpfade mittels des Webpack Context für den Ordner assets
const images = importAll(require.context('../assets/', true, /\.(png|jpe?g|svg)$/));

function App() {
  // Statevariable und -Setter für die gewählte Größe des Avatars
  let [size, setSize] = useState('m');

  // Statevariable und -Setter für den gewählten Typ des Avatars
  let [type, setType] = useState('square');

  // Handlerfunktion für das Größenselect
  function handleSizeChange(evt) {
    // Ausgabe des Textes in der gewählten Option
    // console.log(evt.target.selectedOptions[0].innerText);

    // Setze gewählte Größe im State
    setSize(evt.target.value);
  }

  // Handlerfunktion für das Typselect
  function handleTypeChange(evt) {
    // Setze gewählten Typ im State
    setType(evt.target.value);
  }

  // Erstelle für jedes der importierten Bilder ein img
  let imgs = images.map(image => {
    return <img src={image} key={image} />
  });

  return (
    <div className="App">
      
      <form>
        <label htmlFor="avatar-size">Size</label>
        {/* 
          Der value des selects kommt aus dem state,
          während der changeHandler des selects den state ändert
        */}
        <select id='avatar-size' value={size} onChange={handleSizeChange}>
          <option value="s">s - 30px</option>
          <option value="m">m - 60px</option>
          <option value="l">l - 120px</option>
          <option value="xl">xl - 200px</option>
        </select>

        <br />

        <label htmlFor="avatar-type">Type</label>
        <select id='avatar-type' value={type} onChange={handleTypeChange}>
          <option value="square">square</option>
          <option value="rounded">rounded</option>
          <option value="circle">circle</option>
        </select>

      </form>

      <p>Chosen size: {size}</p>
      <p>Chosen type: {type}</p>

      <Avatar 
        src={picture}
        size={size}
        type={type}
      />

      {/* Zeige die imgs an */}
      {imgs}

    </div>
  );
}




console.log(images);

export default App;
