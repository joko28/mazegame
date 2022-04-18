//Overlap Point and pixel
//the collisions are not checked against bounding boxes but between
//points or image pixels

//left and right keys to move the sprite
//it's position is adjusted to another sprite's opaque pixels

var monster;
var cloud;
var platform;
//var myFont;

var GRAVITY = 1;

function preload() {
  myFont = loadFont('assets/fonts/Monoton-Regular.ttf');
}

function setup() {
  //createCanvas(800, 400);
  var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(229, 204, 255);

  monster = createSprite(300, 100);
  monster.addAnimation('normal', 'assets/monster.png');
  monster.debug = true;

  sun = createSprite(500, 100);
  sun.addAnimation('normal', 'assets/sun1.png', 'assets/sun3.png');
  //sun.addAnimation('transformed', 'assets/monster.png');
  //sun.setCollider('circle', 0, 0, 50);
  sun.debug = true;

  platform = createSprite(400, 250);
  platform.addImage(loadImage('assets/platform.png'));

  monster.depth = 8;
}

function draw() {
  //background(255, 255, 255);

  //if no arrow input set velocity to 0
  monster.velocity.x = 0;

  if (keyIsDown(LEFT_ARROW))
    monster.velocity.x = -5;
  if (keyIsDown(RIGHT_ARROW))
    monster.velocity.x = 5;

  //instead of checking the colliders or bounding box overlaps
  //I can just check a point against a collider
  //if(sun.overlapPoint(triangle.position.x, triangle.position.y))
  //  sun.changeAnimation('transformed');

  //Or check a point against the pixels of a sprite animation or image
  //if the bottom of the triangle is not overlapping with the non transparent pixels
  //of the platform make it fall
  if(platform.overlapPixel(monster.position.x, monster.position.y+30)==false)
    monster.velocity.y += GRAVITY;

  //if the bottom of the triangle is overlapping the non transparent pixels
  //of the platform move it up one pixel until it doesn't overlap anymore
  while(platform.overlapPixel(monster.position.x, monster.position.y+30))
  {
    monster.position.y--;
    monster.velocity.y = 0;
  }

  drawSprites();
  //drawBlock();
  //drawText(font);
  //windowResized();
}

function drawText(font) {
  fill(0);
  textFont(myFont);
  textAlign(CENTER);
  textSize(20);
  text('Move with arrows', width/2, 60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
