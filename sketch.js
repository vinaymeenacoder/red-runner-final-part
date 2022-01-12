var gamestate = 0
var score = 0

function preload(){
  bgimg =  loadImage("bg.jpg")
  fenceimg = loadImage("fence.png")
  trophyimg = loadImage("trophy.png")
  wallimg = loadImage("wall.jpg")
  runnerimg = loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //bg = createSprite(100,height / 2)
  //bg.addImage(bgimg)
  runner = createSprite(100,height-250)
  runner.addAnimation("runner",runnerimg)
  ground = createSprite(width+2000,height-100,5*width,20)
  ground.visible = false
  runner.debug = false
  runner.setCollider("rectangle",0,50,80,200)
  trophy = createSprite(7300,height-150)
  trophy.addImage(trophyimg)
  trophy.scale = 0.4
  wallGroup = new Group()
  fenceGroup = new Group()
}

function draw() {
  //background(255,255,255);  
  if(gamestate === 0){
    background(0)
textSize(35)
fill("red")
text("RED RUNNER",width/2-150,50)
textSize(25)
fill("blue")
text("RULES",100,200)
text("-------",100,220)
textSize(20)
fill("white")
text("1. You have just 1 life",100,300)
text("2. use the right arrow to move forward",100,330)
text("3. use the up arrow key to jump",100,360)
text("4. beware of walls and fences.Those are your obstacles",100,390)
text("5. Reach the end to collect the trophy and win",100,420)
textSize(30)
fill("yellow")
text("Press P to play",width/2+100,height-100)

if(keyDown("p")){
  gamestate = 1
}
  }
  if(gamestate === 1){
  image(bgimg,0,-30,width*5,height)
  textSize(25)
fill("black")
text("Use right arrow key to move forward",width/2+100,50)
text("Use up arrow  to jump and save yourself from obstacles",width/2+100,70)
textSize(25)
fill("black")
text("Score: "+score,camera.x-100,50)
score= score+Math.round(getFrameRate()/60)
  runner.x = camera.x - 500
  if(keyDown(RIGHT_ARROW)){
    camera.x =camera.x+15
  }
  if(keyDown(UP_ARROW) && runner.y>height/2-100){
    runner.velocityY = -10
  }
  if(runner.isTouching(wallGroup)||runner.isTouching(fenceGroup)){
    gamestate = 2
  }
  if(runner.isTouching(trophy)){
    gamestate = 3
  }
  runner.velocityY+=1
  runner.collide(ground)
  walls()
  fences()
  drawSprites();
}
if(gamestate === 2){
  background(0)
  textSize(35)
  fill("red")
  text("RED RUNNER",camera.x-150,50)
  textSize(85)
  fill("white")
  text("GAMEOVER",camera.x-250,height/2)
  textSize(45)
  text("press R to restart ",camera.x-180,height/2+50)
  if(keyDown("R")){
    gamestate = 1
    score = 0
    camera.x = width/2
  }
}
  if(gamestate=== 3){
    background(0)
    textSize(35)
    fill("red")
    text("RED RUNNER",camera.x-150,50)
    textSize(85)
    fill("white")
    text("YOU WIN",camera.x-220,height/2)
    textSize(45)
    text("press s to start over ",camera.x-230,height/2+50)
    if(keyDown("s")){
      gamestate = 0
      camera.x = width/2
    }
  }
}
function walls(){
  if(frameCount%200===0){
    wall = createSprite(camera.x +300,random(height-130,height-250))
    wall.addImage(wallimg)
    wall.scale = 0.7
    wallGroup.add(wall)
  }
  }
  function fences(){
    if(frameCount%300===0){
      fence = createSprite(camera.x +500,random(height-100,height-250))
      fence.addImage(fenceimg)
      fence.scale = 0.7
      fenceGroup.add(fence)
    }
}