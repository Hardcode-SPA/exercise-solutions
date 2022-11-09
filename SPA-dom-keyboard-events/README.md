# Let's make Mario walk - DOM keyboard events

![Mario Walk](assets/mario-walk.gif)

# Description:

We want make mario walks with using keyboard.

## Task 1:

- Create a script.js file and link it with provided index.html file.

## Task 2:

- Inside script.js file:

- create a variable called "mario" that will contain the html element with an id "mario";
- create a variable called "imgMario" that will contain the html img element,
- set source of image to "mario-stand.gif" - to do this imgMario variable.
  > Hint: you can change src attribute by using
  > [src property](https://www.w3schools.com/jsref/prop_img_src.asp).

## Task 3:

- create a function "stopMario", that will stop Mario when it's called.
  > Hint: use src attribute to change .gif.

## Task 4:

- create a function "moveMario", that will listen to keyboard events;
  - you could also apply styles globally/outside the function to Mario as needed;
- check if src attribute is set to "mario-walk.gif" if not, set it to "mario-walk.gif";
- check which arrow key was pressed (arrow left or arrow right) and apply right styles from description below:

#### Walk

- If the right arrow key was pressed, Mario should be moved 10 pixels to the right.
- If the left arrow key was pressed, Mario should be moved 10 pixels to the left.

#### Hold down the key

- Mario should keep moving as long as any key is pressed.

#### Rotate

- You want Mario to turn in the direction he is going.
  > Hint: An image can be [mirrored](https://www.w3schools.com/howto/howto_css_flip_image.asp).

#### Stand still

- If no key is pressed, we don't want Mario to animate, but display the still image `assets/mario-stand.gif`.

## Step 5:

- Add event listener that will listen for an event when you press any key on your keyboard. Use function "moveMario" as a callback.

- Add event listener that will listen for an event when you release pressed key on your keyboard. Use function "stopMario" as a callback.

# Good luck :)
