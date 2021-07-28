var player , enemy , playerBullet , enemyBullet
var back 
var enemy2 , bulletImg , enemyBulletImg
var playerImg , enemyImg, playerBImg, enemyBImg
var bgI1 , bgI2 , bgI3 
var gamestate = "stage1"
var score = 0
var flag = 1
var flag2 = 1 
var spaceShipImg
var enemySpaceShip , carImg
var backImg3

function preload(){
bgI1 = loadImage("back 1.jpg")
bgI2 = loadImage("background.jpg")
bgI3 = loadImage("Back 3.jpg")
playerImg= loadAnimation("player1.png", "player2.png", "player3.png", "player4.png")
enemyImg = loadImage("enemy.png")
bulletImg = loadImage("image.png")
enemyBulletImg = loadImage("enemyBullet.png")
spaceShipImg = loadAnimation("spaceShip.png")
enemySpaceShip = loadImage("enemySpaceShip.png")
carImg = loadAnimation("car.jpg")
backImg3 = loadImage("track1.jpg")
}

function setup(){

createCanvas(500,900)
back = createSprite(250,450)
back.addImage(bgI2)

player = createSprite(200,800)
player.addAnimation("running", playerImg)
player.addAnimation("spaceShip" , spaceShipImg)
player.addAnimation("car", carImg)

enemy = createSprite(70,100)
enemy.addImage(enemyImg)
enemy.scale = 0.2

enemy2 = createSprite(330,100)
enemy2.addImage(enemyImg)
enemy2.scale = 0.2
bulletGroup = new Group()
enemyGroup = new Group()
enemyGroup1 = new Group()
SpaceShipGroup = new Group()

}

function draw(){
 background(0)
 if(gamestate === "stage1"){
 
    if(frameCount % 40 === 0){
 createBullets();
    }
 if(flag === 1){
 createEnemyBullet();
 }
 if(flag2 === 1){
 createEnemy1Bullet();
 }


  
  if(enemyGroup.isTouching(player) || enemyGroup1.isTouching(player)){
      enemyGroup.destroyEach();
      enemyGroup1.destroyEach();
      player.destroy();
      bulletGroup.destroyEach();
      gamestate = "over"
  }

  if(bulletGroup.isTouching(enemy)){
      score = score+1
      enemy.destroy();
      enemyGroup.destroyEach();
      flag = 0
  }

  if(bulletGroup.isTouching(enemy2)){
    score = score+1
      enemy2.destroy();
      enemyGroup1.destroyEach();
      flag2 = 0  
  }

   if(score === 2 ){
       score = 0
       gamestate = "stage2"
   }
  }
  if(gamestate === "stage2"){
      back.addImage(bgI3)

      player.changeAnimation("spaceShip" , spaceShipImg)

      EnemySpaceShips()


      if(keyWentDown("space")){
        createBullets();
      }

      for( var i = 0 ; i < bulletGroup.length ; i++){
          for(var j = 0 ; j < SpaceShipGroup.length ; j++){
              if(bulletGroup.get(i).isTouching(SpaceShipGroup.get(j))){
                  bulletGroup.get(i).destroy()
                  SpaceShipGroup.get(j).destroy()
                  score = score + 1
              }
          }
      }
      
      if(score === 5){
          score = 0 
          gamestate = "stage3"
          
          
      }
  }

  if(gamestate === "stage3"){
     back.addImage(backImg3)

     player.changeAnimation("car", carImg)
  }
  player.x =mouseX

  back.velocityY = 5
 if(back.y > 700 ){
     back.y = 20
 }
drawSprites();

textSize(15)
fill("black")
text("score = "+ score , 400, 50)

}

function createBullets(){
    
    var bullet = createSprite(player.x,650,10,20)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityY = -5
    bullet.lifetime= 130
    bullet.shapeColor="red"
    bulletGroup.add(bullet)
    
}

function createEnemyBullet(){
    if(frameCount % 40 === 0){
        var eBullet = createSprite(enemy.x,120,10,10)
        eBullet.addImage(enemyBulletImg)
        eBullet.scale = 0.2
        eBullet.velocityY = 10
        var r = Math.round(random(2,6))
        eBullet.velocityX = r
        eBullet.lifetime = 130 
        eBullet.shapeColour = "red"
        enemyGroup.add(eBullet)
    }
}

function createEnemy1Bullet(){
    if(frameCount % 40 === 0){
        var Bullet1 = createSprite(enemy2.x,120,10,10)
        Bullet1.addImage(enemyBulletImg)
        Bullet1.scale = 0.2 
        Bullet1.velocityY = 10
        var ra = Math.round(random(-6,-2))
        Bullet1.velocityX = ra
        Bullet1.lifetime = 130
        Bullet1.shapeColor = "red"
        enemyGroup1.add(Bullet1)
    }
}

function EnemySpaceShips(){
    if(frameCount % 80 === 0){
        var spaceShip = createSprite(0,0)
        var r = Math.round(random(50,450))
        spaceShip.x = r
        spaceShip.addImage(enemySpaceShip)
        spaceShip.scale = 0.2
        spaceShip.velocityY = 10
        spaceShip.lifetime = 130
        spaceShip.shapeColor = "red"
        SpaceShipGroup.add(spaceShip)
    }
}