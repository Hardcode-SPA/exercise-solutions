# array method simulation

## Task

Create a small web page that displays an array of date objects.

![reference image](reference.png)

There should be four buttons for the basic array methods:

- push
- pop
- unshift
- shift

## Hints

1. create three components:
   - ArraList
   - ArrayEntry
   - Controls (for the buttons)
2. when a button is pressed in the Controls component, a function from the main component (App) should be called (onPush, onPop, onUnshift, onShift).
3. in the app component an array should be created as initial value of the state with **useReducer**.
4. the reducer function should handle all four cases and adjust/replace the array accordingly.
5. for the _actions_ **push** and **unshift** the action object must have a payload/data.
6. to change the array it is best to use the spread operator and/or the slice() method.
