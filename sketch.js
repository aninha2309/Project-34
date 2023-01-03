const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,food,ground;
var food_con;
var food_con_2;

var bg_img;
var food;
var panda;

var button;
var eat,sad;

function preload()
{
  bg_img = loadImage("background.jpg");
  food = loadImage("food.png");
  panda = loadImage("panda.png");;
  eat = loadImage("eat.png");
  sad = loadImage("sad.png");
  
  
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('button.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  


  eat.frameDelay = 20;
  sad.frameDelay = 20;
  panda = createSprite(230,620,100,100);
  panda.scale = 0.2;

 
  panda.addAnimation('eating',eat);
  panda.addAnimation('crying',sad);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  food = Bodies.rectangle(300,300,20);
  Matter.Composite.add(rope.body,food);

  food_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  
  if(fruit !=null){
  
  image(food,foodd.position.x,food.position.y,70,70);   
  }
  

  rope.show();
  Engine.update(engine);
  ground.show();
  if(collide(food,panda2)== true){
    panda.changeAnimation("eating")
  }
  if(collide(food,ground.body)== true){
    panda.changeAnimation("crying")
  }
   drawSprites();
}

function drop()
{
  rope.break();
  food_con.detach();
  food_con = null; 
}
function collide(body,sprite){
  if(food != null){
  var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  if(d <= 80 ){
    World.remove(engine.world,food);
    food = null;
    return true;
  }  
  else{
    return false;
  }
  }

}