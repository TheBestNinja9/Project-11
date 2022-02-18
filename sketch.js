var x = 1;
var path, boy, leftBoundary, rightBoundary;
var pathImg, boyImg;
var i;
var bomb, bomb_Image;
var coin_Image;
var energyDrink_Image;
var power, power_Image;
var obstacle;

function preload() {
    pathImg = loadImage("path.png");
    coin_Image = loadImage("coin.png");
    bomb_Image = loadImage("bomb.png");
    energyDrink_Image = loadImage("energyDrink.png");
    boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
    power_Image = loadImage("power.png")
}

function setup() {

    createCanvas(400, 400);

    // Moving background
    path = createSprite(200, 200);
    path.addImage(pathImg);
    path.scale = 1.2;

    //creating boy running
    boy = createSprite(180, 340, 30, 30);
    boy.scale = 0.08;
    boy.addAnimation("JakeRunning", boyImg);


    leftBoundary = createSprite(0, 0, 100, 800);

    // leftBoundary.invisible = false;
    // leftBoundary.visible = true;
    // leftBoundary.invisible = true;
    leftBoundary.visible = false;


    rightBoundary = createSprite(410, 0, 100, 800);
    rightBoundary.visible = false;

    obstacle = createSprite(random(10, 390), 10, 50, 50);
    var ran = Math.round(random(1, 2));
    switch (ran) {
        case 1:
            obstacle.addImage(coin_Image);
            break;
        case 2:
            obstacle.addImage(energyDrink_Image);
            break;
        default:
            break;

    }
    obstacle.velocityY = 6;
    obstacle.scale = 0.25
    obstacle.lifetime = obstacle.y / obstacle.velocityY;



    bomb = createSprite(random(10, 390), -50, 50, 50);
    var ran = Math.round(random(1, 2));
    bomb.addImage(bomb_Image);
    bomb.velocityY = 6 * x;
    bomb.scale = 0.1
    bomb.lifetime = bomb.y / bomb.velocityY;


}

function draw() {


    background(0);

    if (frameCount % 125 === 0) {
        bomb = createSprite(random(10, 390), -50, 50, 50);
        var ran = Math.round(random(1, 2));
        bomb.addImage(bomb_Image);
        bomb.velocityY = 6 * x;
        bomb.scale = 0.1
        bomb.lifetime = bomb.y / bomb.velocityY;
    }

    if (bomb.isTouching(boy)) {
        boy.destroy();
        x = 0;
        bomb.destroy();
        obstacle.destroy();
    }


    if (frameCount % 75 === 0) {
        obstacle = createSprite(random(10, 390), -60, 50, 50);
        var ran = Math.round(random(1, 2));
        switch (ran) {
            case 1:
                obstacle.addImage(coin_Image);
                break;
            case 2:
                obstacle.addImage(energyDrink_Image);
                break;
            default:
                break;

        }
        obstacle.velocityY = 6 * x;
        obstacle.scale = 0.25
        obstacle.lifetime = obstacle.y / obstacle.velocityY;
    }

    path.velocityY = 4;

    boy.x = World.mouseX;

    if (obstacle.isTouching(boy)) {
        power = createSprite(200, 200, 50, 50);
        power.addImage("power", power_Image)
        power.scale = 0.5;
        power.lifetime = 15;
        x = x * 1.005

    }

    edges = createEdgeSprites();
    boy.collide(edges[3]);
    boy.collide(leftBoundary);
    boy.collide(rightBoundary);

    //code to reset the background

    path.velocityY = 4 * x;

    if (path.y > 400) {
        path.y = height / 1.6;
    }

    /*if(path.y > 400 ){
     
    path.y = height/2;
    }*/

    /*if(path.y > 400 ){
    path.y = height/2;}*/

    /*if(path.y > 400 ){path.y = height/2;}*/

    console.log(x);
    drawSprites();
}