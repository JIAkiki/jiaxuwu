let state = "happy";
let x = 0;
let y = 0;
let lastX = 0;
let lastY = 0;

function setup() {
  img1 = loadImage("wing.png");
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (state === "happy") {
    targetX = mouseX;
    targetY = mouseY;

    x += (targetX - x) * 0.05;
    y += (targetY - y) * 0.05;
  } else if (state === "sad") {
    x = lastX;
    y = lastY;
  }

  if (state === "happy") {
    // draw happy face
    ellipse(x, y, 100, 100);
    ellipse(x - 20, y - 20, 20, 20);
    ellipse(x + 20, y - 20, 20, 20);
    arc(x, y, 60, 60, 0, PI, CHORD);
    image(img1, mouseX - 50, mouseY - 50, 100, 100);
  } else if (state === "sad") {
    // draw sad face
    ellipse(x, y, 100, 100);
    ellipse(x - 20, y - 20, 20, 20);
    ellipse(x + 20, y - 20, 20, 20);
    arc(x, y + 30, 60, 60, PI, TWO_PI, CHORD);
  }

  lastX = x;
  lastY = y;

  textSize(20);
  textAlign(CENTER);
  text("Click to eat the chicken yourself.", width / 2, height - 50);
}

function mousePressed() {
  if (mouseIsPressed) {
    if (state === "happy") {
      state = "sad";
    } else if (state === "sad") {
      state = "happy";
    }
  }
}
