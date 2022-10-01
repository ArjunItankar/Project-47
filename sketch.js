var bg,bgImg;
var topground;
var bottomground;
var balloon,balloonImg;
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var gameOver, gameOverImg;
var restart, restartImg;

var score = 0;

//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload () {
  bgImg = loadImage("assets/bg.png");

  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");

  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");

  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");

}

function setup () {
  
  createCanvas(windowWidth,windowHeight);
//background image
  bg = createSprite(165,485,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.3;

  //creating top and bottom grounds
  topground = createSprite(200,10,800,20);
  topground.visible = false;

  bottomground = createSprite(200,390,800,20);
  bottomground.visible = false;

//creating balloon
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.2;
  balloon.debug = true;

  //initialising groups
  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();
  barGroup = new Group();

  //creating game over and restart sprites
  gameOver = createSprite(220,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(220,240);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

}

function draw () {

  background("black");


  if(gameState === PLAY){

  
  //making the hot air balloon jump
  if(keyDown("space")){
    balloon.velocityY = -6;

  }

  //adding gravity
  balloon.velocityY = balloon.velocityY + 2;

  Bars();

  //spawning top and bottom obstacles
  spawnObstaclesTop();
  spawnObstaclesBottom();

  //coundition for END state
  if(topObstaclesGroup.isTouching(balloon)||balloon.isTouching(topground)
    || balloon.isTouching(bottomground)||bottomObstaclesGroup.isTouching(balloon)){

      gameState = END;
        
    }
  }

    if(gameState === END){

      gameOver.visible = true;
      gameOver.depth = gameOver.depth+1;
      restart.visible = true;
      restart.depth = gameOver.depth+1;

      //all sprites should stop moving in the end state
      balloon.velocityX = 0;
      balloon.velocityY = 0;
      topObstaclesGroup.setVelocityXEach(0);
      bottomObstaclesGroup.setVelocityXEach(0);
      barGroup.setVelocityXEach(0);

      //setting -1 lifetime so thqat obstacles doon't disappear in the END state
      topObstaclesGroup.setLifetimeEach(-1);
      bottomObstaclesGroup.setLifetimeEach(-1);

      balloon.y = 200;

      //resetting the game

      if(mousePressedOver(restart)){
        reset();
      }

    }
  drawSprites();

}


function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();

  score = 0;
}


function spawnObstaclesTop()
{
  if(World.frameCOunt % 60 === 0) {
    obstacleTop = createSprite(400,50,40,50);

    obstacleTop.addImage(obsTop1);

    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10, 100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

    //assign lifetime to the variable
    obstacleTop.lifetime = 100;

    balloon.depth = balloon.depth + 1;

    topObstaclesGroup.add(obstacleTop);

    }
}

function spawnObstaclesBottom()
{
  if(World.frameCOunt % 60 === 0) {
    obstacleBotom = createSprite(400,350,40,50);

    obstacleBottom.addImage(obsBotttom1);
    obstacleBottom.debug = true;

    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;

    //generate random top obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

    //assign lifetime to the variable
    obstacleBottom.lifetime = 100;

    balloon.depth = balloon.depth + 1;

    bottomObstaclesGroup.add(obstacleBottom);




    }
}

function Bars()
{
  if(World.fameCount % 60 === 0)
  {
    var bars = createSprite(400,200,10,800);
   bars.velocityX = -6;


   bars.depth = balloon.depth;
   bars.lifetime = 70;
   bars.visible = false;

   barGroup.add(bar);
  }

}

function Score(){

  if (balloon.isTouching(barGroup)){

    score = score+1;
  }
  textFOnt("algerian");
  textSize(30);
  FileList("yellow");
  text("Score: "+ score, 250, 50);


}

