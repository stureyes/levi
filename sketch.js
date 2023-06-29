// center point
let centerX = 0.0, centerY = 0.0;
let radius = 40, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0019, damping = 0.98;
let nodes = 5;
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];
let organicConstant = 1.0;
//everything above is for the jibbly levi

let a, b; //bubbles

function setup() {
  createCanvas(500, 500);

  //center shape in window
  centerX = width / 2;
  centerY = height / 2;
  a = width / 5; //bubbles
  b = height /5;//bubbles

  //initialize arrays to 0 - Levi
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes - Levi
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(12, 20);
  }

  noStroke();
  frameRate(30);
}

function draw() {
  fill(115, 184, 225, 106, 167, 215); //background
  stroke(227, 185, 117); //Levi
  rect(0, 0, width, height); //levi
  drawShape(); //levi
  moveShape(); //levi
  fill (221, 108, 145); //fish
  ellipse (mouseX,mouseY, 20, 50); //fish
  stroke(177, 239, 245); //bubble
  fill (168, 235, 255,81, 126, 222); //bubble
  ellipse(a, b, 50, 50); //bubble
  a = a + random(-10, 10); // bubble Jiggling randomly on the horizontal axis
  b = b - 5; // bubble Moving up at a constant speed

 if (b < 0) {
    b = height;
  }
  fill(163, 226, 185);
  noStroke();
  beginShape ();
  vertex(400, 400);
  vertex(210, 420);
  vertex(0,430);
  vertex(0,500);
  vertex(500,500);
  vertex(500,430);
  endShape (closed);
  //above is ground shape
}

function drawShape() {
  //  calculate node  starting locations
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }

  // draw polygon
  curveTightness(organicConstant);
  fill(227, 185, 117); //Levi
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  for (let i = 0; i < nodes-1; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  //move center point
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  centerX += accelX;
  centerY += accelY;

  // slow down springing
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  //move nodes
  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
    angle[i] += frequency[i];
  }
}