var color1 = "#00ff00";
var color2 = "#ff0000";
var circleCoords = [200, 75]; // coordinates of the circle to draw at
var circleSpeed = 0; // speed = change in y, changed by circleYAccel
var circleYAccel = 1; // "force of gravity". It's positive because bigger coordinates = lower
var highest = 75; // keep track of the highest point for gravity. 0 is the highest

// TODO: FIX BALL GETTING STUCK IN THE GROUND BY USING DR JAICLIN'S METHOD !!

function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{

  // Reset frame
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the circle(s)
  ball1.draw();

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
window.addEventListener("keydown", function(e) {
  if(e.keyCode == 32) {
    // TODO PROGRAM THE BOUNCE!
  }
});
// TODO ADD A WAY FOR THERE TO BE MULTIPLE BALLS?

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

var ball1 = new Ball("#ff0000", 50, 100, 100, canvas, context);



// Fire up the animation engine
window.requestAnimationFrame(drawAll);
