import { useReducer } from "react";
import { useState } from "react";
import ArrayList from "./components/ArrayList";
import Controls from "./components/Controls";

const ACTION_TYPES = {
  push: 'push',
  pop: 'pop',
  unshift: 'unshift',
  shift: 'shift'
};

// Reducer Funktion zum Aktualisieren des States
// Nimmt den urspruenglichen State entgegen und ein action-Objekt,
// in dem der action-type steht (also welche Operation durchgefuehrt werden soll)
// und ggf. eine payload (also ein evtl. neuer Wert fuer die Aktualisierung)
function datesReducer(state, action) {
  // Etwas unperfomanter gegenueber slice
  // let stateCopy = [...state];
  let stateCopy = state.slice(0);

  switch (action.type) {
    case ACTION_TYPES.push: {
      stateCopy.push(action.payload);
      break;
    }

    case ACTION_TYPES.pop: {
      stateCopy.pop();
      break;
    }

    case ACTION_TYPES.unshift: {
      stateCopy.unshift(action.payload);
      break;
    }

    case ACTION_TYPES.shift: {
      stateCopy.shift();
      break;
    }

    default:
      return state;
  }

  return stateCopy;
}

function App() {
  // Zustandsspeicher wird per useReducer hinterlegt, statt useState
  // useReducer erhaelt eine Referenz auf die Reducer-Funktion
  // sowie einen Initialwert fuer den Zustand
  let [dates, dispatch] = useReducer(datesReducer, [
    new Date(),
    new Date(2023, 0, 1),
    new Date(2022, 11, 31)
  ]);


  // Clickhandler, der an die Controls-Komponente uebergeben wird
  function onPush(evt) {
    console.log('push');
    // Dispatch-Aufruf zum Anstoss der Stateaenderung
    // kriegt ein action-Objekt als Parameter uebergeben
    dispatch({
      type: ACTION_TYPES.push,
      payload: new Date()
    });
  }

  function onPop(evt) {
    console.log('pop');
    dispatch({type: ACTION_TYPES.pop});
  }

  function onUnshift(evt) {
    console.log('unshift');
    dispatch({
      type: ACTION_TYPES.unshift,
      payload: new Date()
    });
  }

  function onShift(evt) {
    console.log('shift');
    dispatch({type: ACTION_TYPES.shift});
  }

  return (
    <div className="App">
      <h1>Dates</h1>
      <ArrayList dates={dates}  />
      <Controls 
        pushCallback={onPush}
        popCallback={onPop}
        unshiftCallback={onUnshift}
        shiftCallback={onShift}
      />
    </div>
  );
}

export default App;
