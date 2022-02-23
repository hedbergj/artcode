var orbiters=[];
var neworbiters = [];
var gravity = 1.0;
var totalMass;
var Trails = [];
var paths = [];
var masses = [];
var xvels = [];
var yvels = [];
var colors = [];
var c=0;
var imgcount = 0;
var ticks = 0;
var SolarSystem;
function setup(){

  //frameRate(20);
  createCanvas(windowWidth, windowHeight);
v1 = 9;
orbiters=[];
massRatio = 1000;
cursor(CROSS);
 SolarSystem = new GravSystem(orbiters);
colorMode(HSL, 360,100,100)
background(0,0,100,0);
ticks = 0;
spawn3Bodies();

//
 }


function spawn3Bodies() {
  for (i = 0;i<3;i++)
 {
   masses[i]=random(50,400);
   colors[0]=color(0,0,90);
   colors[1]=color(0,0,50)
   colors[2]=color(0,0,10)
   // colors[0]=color(230,40,50)
   // colors[1]=color(10,0,40)
   // colors[2]=color(10,0,60)
   velseed = 1;
   xvels[i] = random(-.2,.2);
   yvels[i] = random(-.2,.2);
   // xvels[2] = -(masses[0]*xvels[0]+masses[1]*xvels[1])/masses[2];
   // yvels[2] = -(masses[0]*yvels[0]+masses[1]*yvels[1])/masses[2];
   orbiters.push(new Orbiter(createVector(random(.1*width,.9*width),random(0.1*height,0.9*height)),createVector(xvels[i],yvels[i]),createVector(0,0),masses[i], colors[i]));
   paths.push(new Path(colors[i]));
}

}

function draw(){
//background(240);
for (l=0;l<orbiters.length;l++){
  //paths[l].update(l);
  //paths[l].display();
}
for (i=0;i<orbiters.length;i++){
  orbiters[i].display();
}



  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
  }


ticks++
// if ( orbiters[0].position.magSq() > (2*width*width) && orbiters[1].position.magSq() > (2*width*width) && orbiters[2].position.magSq() > (2*width*width)) {
//   imgcount++
//   saveCanvas('3bodyart'+imgcount, 'png');
//   restart()
// }
//
// if (ticks == 20000){
//   imgcount++
//   saveCanvas('3bodyart'+imgcount, 'png');
//   restart()
// }

}

var Path = function(color_){
    this.points = [];
    this.ticker = 0;
    this.color = color_;
}

Path.prototype.update = function(whichOrb){
  this.ticker++
  if(this.ticker % 2 == 0){
    //console.log(i)
    if(orbiters[whichOrb].position.x>.001){
    this.points.push(new createVector(orbiters[whichOrb].position.x+random(-1,1),orbiters[whichOrb].position.y+random(-1,1)))
  }
  }
}

Path.prototype.display = function(){

noFill();
stroke(this.color);
strokeWeight(1);
beginShape();
for (i=0;i<this.points.length;i++)
  {
    curveVertex(this.points[i].x,this.points[i].y)
  }
endShape();

}


function COM(){

  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y,)
  line(com.x,com.y-5,com.x,com.y+5,)
  pop();
}




function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowHeight, windowHeight); // width and height system variables updated here
  }


  function restart(){

      setup()
  }
function touchEnded(){

    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
      paths.splice(i,1);
      clear()
      background(0,0,95);
    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }

  }
  spawn3Bodies();
    return false;
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('3bodart'+ticks, 'png');

  }
}
