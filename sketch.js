var canH, canW;

var bgSprite, bgImg;
var boat, boatImg, boatMoveImg;
var lineL, lineR, line, lineStart, lineEnd;

var moving= false;
var timer= 5000;

function preload() {
  bgImg= loadImage("./assets/bg.jpg");
  boatImg= loadImage("./assets/boat.png");
  boatMoveImg= loadImage("./assets/boatmove.png")
}

function setup() {
  var isMobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    canW= displayWidth;
    canH= displayHeight;
    createCanvas(displayWidth+50, displayHeight);
  }
  else{
    canW= windowWidth;
    canH= windowHeight;
    createCanvas(windowWidth, windowHeight-5);
  }

  boat= createSprite(width/2, height-150);
  boat.addImage("boat", boatImg);
  boat.addImage("boatMove", boatMoveImg);
  boat.scale= 0.7;
  //boat.debug= true;

  lineL= createSprite(width/4+50, -height, 20, height * 10);
  lineR= createSprite(width/2+400, -height, 20, height * 10);

  lineStart= createSprite(width/2, height-400, width, 20);
  lineEnd= createSprite(width/2, -height*6+400, width, 20);

  line= createSprite(width/2, height, width, 20);
  line.visible= false;

  lineL.visible= false;
  lineR.visible= false;
  //lineStart.visible= false;
  //lineEnd.visible= false;

}


function draw() 
{
  background(300);

  image(bgImg, 25, -height * 6, width-50, height * 7);

    if (keyIsDown(UP_ARROW)) {
      boat.position.y -= 20;
      moving=true;
      boat.changeImage("boatMove");
    }else{
      moving=false;
      boat.changeImage("boat");
    }

    if (keyIsDown(LEFT_ARROW)) {
      boat.position.x -= 10;
    }else{
      moving=false;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      boat.position.x += 10;
    }else{
      moving=false;
    }

    if (keyIsDown(DOWN_ARROW)) {
      boat.position.y += 20;
    }else{
      moving=false;
    }

  camera.position.y = boat.position.y-100;

  boat.collide(lineL);
  boat.collide(lineR);
  boat.collide(line);

  textSize(50);
  textFont("Calibri");
  fill(900);
  text("TIME: "+ timer + "s", 50, camera.position.y-200);

  drawSprites();


}

