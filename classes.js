class Ball {

  // Constructor //

  constructor(color, radius, x, y, canvas, context) {
    // Accepted from the constructor -- each ball has different traits
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.context = context;
    // Basic start values for every ball
    this.speed = 0;
    this.accel = this.canvas.height / 800; // on a window 800 tall that is the standard 1
    this.highest = this.canvas.height;
  }

  // ----- //
  // Getters and setters //

  setX(x) {
    // Purpose: changes the x value of the ball
    // Inputs: x (coordinate) to move the ball to
    // Outputs: none
    this.x = x;
  }

  setNewColor() {
    // Note: taken from StackOverflow
    // Creates a new random color and returns it using a string to create a hex code
    // Used to recolor the ball
    var letters = '0123456789ABCDEF';
    var newColor = '#';
    for (var i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * 16)];
    }
    this.color = newColor; // set the new color of the ball
  }

  changeRadius(amount) {
    if (this.radius + amount > 0) {
      this.radius += amount;
    }
  }

  // ----- //
  // Movement methods //

  updatePosition() {
    // Adjusts the speed based on the acceleration of the ball
    this.speed += this.accel;
    // Check if the ball has reached a new height.
    if (this.y < this.highest) {
      this.highest = this.y; // lower values are higher
    }
    // Checks to ensure that the ball isn't over the boundaries of the canvas
    // This is done before. When the ball is out, the speed is changed before the ball is moved.
    this.checkBoundary();
    // Adjusts the y-value of the ball based on the speed
    this.y += this.speed;
  }

  checkBoundary() {
    // Bouncing off the bottom -- there was a problem with it false detecting being
    // near the bottom because the ball would rise but not high enough to pass the
    // y + radius >= height threshhold, so it would become stuck. Now, it only considers
    // bouncing off the bottom if it's already going down.
    if (this.y + this.radius >= this.canvas.height && this.speed >= 0) {
      this.speed = -.045 * (this.canvas.height - this.highest); // calculate the new speed = 10% of the highest value
      this.highest = this.canvas.height; // reset highest value
      if (Math.abs(this.speed) < 5) { // at very slow speeds, just stop
        // Set an absolute stop on the bottom when the speed is very small
        this.y = this.canvas.height - this.radius;
        this.speed = 0;
      }
    }
    // Bouncing off the top
    if (this.y - this.radius <= 0) {
      this.speed = 0.5 * Math.abs(this.speed); // bounce back with half velocity
      this.highest = 0; // highest value = top of the screen
    }
  }

  bounce() {
    this.speed = -20;
    this.y -= 10;
    this.highest = this.canvas.height; // reset the highest value after each bounce
  }

  // ----- //
  // Draw method //
  draw() {
    var ctx = this.context; // for ease of calling
    // Set the color of the ball to the object's color
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    // Update the position of the ball for each frame
    this.updatePosition();
    // Draw and fill a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

}
