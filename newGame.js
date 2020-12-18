// Canvas.js Project: Bouncing circles
// Eli Browne / Hon Comp Sci P. 5 / Dr. Jaiclin / 12.18.20

// Note: this "simulator" (?) will struggle on very short windows. The ball will
// look floaty and unnatural. This was done to make sure that the ball doesn't ever
// get stuck in a loop of it crashing into the roof and then crashing into the floor,
// especially on larger screens where the maximum height the ball could reach and the
// subsequent bounce speed that the ball could reach could become too large. Works
// ideally on a full-screen window on a laptop, but should work on larger screens too.

var balls = []; // every ball is stored in this array

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
    for (var ball of balls) {
      ball.bounce();
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
  }
  if(e.keyCode == 38) {
    // Up arrow: larger radius
    for (var ball of balls) {
      ball.changeRadius(5);
    }
  }
  if(e.keyCode == 40) {
    // Down arrow: smaller radius
    for (var ball of balls) {
      ball.changeRadius(-5);
    }
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
  context.font = "25px Arial";
  context.fillText("Up/down for ball size; right/left for ball quantity; space to bounce", 25, 50);
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
