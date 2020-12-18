// Canvas.js Project: Bouncing circles
// Eli Browne / Hon Comp Sci P. 5 / Dr. Jaiclin / 12.18.20

// Note: this "simulator" (?) will struggle on very short windows. The ball will
// look floaty and unnatural. This was done to make sure that the ball doesn't ever
// get stuck in a loop of it crashing into the roof and then crashing into the floor,
// especially on larger screens where the maximum height the ball could reach and the
// subsequent bounce speed that the ball could reach could become too large. Works
// best on a laptop (my window is 800 tall), but should work on larger screens too.

var balls = []; // every ball is stored in this array
var activeBallIndex = -1; // -1 = all balls, 0-n = one ball in the list

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");

// Set up the context for the animation
context = canvas.getContext("2d");

// Fire up the animation engine
window.requestAnimationFrame(drawAll);

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

// Border
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Key listeners for ball size, ball count, bouncing
window.addEventListener("keydown", function(e) {
  if(e.keyCode == 32) {
    if (activeBallIndex == -1) { // every ball gets bounced
      for (var ball of balls) {
        ball.bounce();
      }
    }
    else { // only the active ball gets bounced
      balls[activeBallIndex].bounce();
    }
  }
  if(e.keyCode == 39) {
    // Right arrow: add a ball
    balls.push(new Ball("#ff0000", 50, 100, 100, canvas, context)); // new ball
    resetBallX();
  }
  if(e.keyCode == 37) {
    // Left arrow: remove a ball (if possible)
    balls.pop();
    resetBallX();
    // If the removed ball was the activeBallIndex, reset it so all balls are active
    if (balls.length == activeBallIndex) { // length = +1 so it works
      activeBallIndex = -1; // reset to universal
    }
  }
  if(e.keyCode == 38) {
    // Up arrow: larger radius
    if (activeBallIndex == -1) { // every ball gets changed
      for (var ball of balls) {
        ball.changeRadius(5);
      }
    }
    else { // only the active ball gets changed
      balls[activeBallIndex].changeRadius(5);
    }
  }
  if(e.keyCode == 40) {
    // Down arrow: smaller radius
    if (activeBallIndex == -1) { // every ball gets changed
      for (var ball of balls) {
        ball.changeRadius(-5);
      }
    }
    else { // only the active ball gets changed
      balls[activeBallIndex].changeRadius(-5);
    }
  }
});

// Mouse listener for "focusing" on a certain ball/balls
// Note: I used mousedown instead of click because I like it how it's a faster response for the user :)
window.addEventListener("mousedown", function(e) {
  // Mouse coordinates (for more easy use later)
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;
  // Check through each ball -- is it within the radius of the ball?
  var ballFound = false; // boolean flag to detect is a ball was detected
  for (var i = 0; i < balls.length; i++) { // no for..of loop used because I want to use the iterator
    if (calculateDistance(mouseX, mouseY, balls[i].getX(), balls[i].getY()) < balls[i].getRadius()) {
      // They clicked within the boundaries of the circle
      activeBallIndex = i;
      balls[i].makeActive();
      // Set the boolean flag
      ballFound = true;
    }
    else {
      balls[i].deactivate(); // nonclicked balls should revert to red
    }
  }
  if (!ballFound) {
    // No ball was found. They clicked on void, so the active ball should be "-1"
    activeBallIndex = -1;
  }
});

function drawAll() {
  // Purpose: Draws frames and repeats
  // Inputs: No inputs
  // Returns: Calls itself to draw the next frame

  context.clearRect(0, 0, canvas.width, canvas.height); // reset the frame
  // Draw the circle(s) by looping over the list of circles
  for (var ball of balls) {
    ball.draw();
  }
  // Instructions for the user
  context.fillStyle = "#000000";
  context.font = "20px Arial";
  // Huge instructions blob
  context.fillText("Up/down for ball size; right/left for ball quantity; space to bounce.", 25, 50);
  context.fillText("Click on a ball to only affect it; click anywhere else to affect all balls.", 25, 70);
  context.fillText("If only one ball is being affected, it will appear blue and unaffected balls will be red.", 25, 90);
  context.fillText("If all balls are affected, they'll all be red.", 25, 110);
  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}

function resetBallX() {
  // Purpose: Moves the x coordinates of the balls relative to screen size and the number of balls
  // Inputs: none
  // Outputs: none
  for (var i = 0; i < balls.length; i++) { // using i for math
    // Divide the balls evenly across the screen (ie 1 ball = 1/2, 2 balls = 1/3 intervals)
    balls[i].setX(windowWidth / (balls.length + 1) * (i + 1));
  }
}

function calculateDistance (x1, y1, x2, y2) {
  // Purpose: calculate the distance between two points
  // Inputs: two sets of coordinates with both x and y values
  // Outputs: the calculated distance as an integer
  // I made this into a separate function so the code would be more readable.
  return Math.hypot((x1 - x2), (y1 - y2)); // hypot is built in and calculates the hypotenuse
}
