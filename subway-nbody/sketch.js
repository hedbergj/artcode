
var SubwaySystem;
var subwayLines=[];
var paths = [];
var masses = [];
var xvels = [];
var yvels = [];
var xpos = [];
var ypos = [];
var vmax = 1;
var colors = [];

var bigG = .8;
var imgcount = 0;
var linecolors = ["#0039A6","#FF6319","#6CBE45","#996633","#A7A9AC","#FCCC0A","#EE352E","#00933C","#B933AD"]
var junctions = [];

function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight);
  subwayLines=[];
  SubwaySystem = new GravitationallyBoundSystem(subwayLines);
  colorMode(HSL, 360,100,100)
  background(208,64.9,77.6);
  spawn9Bodies();

 }


function spawn9Bodies() {
  for (i = 0;i<9;i++)
 {
   masses[i]=50;

   colors[i]=linecolors[i]

   xpos[i] = random(0,width)
   ypos[i] = random(0,height)
   if (xpos[i]>width/2){
     xvels[i] = random(-vmax,0)*random([0,1]);
   }
   else {
     xvels[i] = random(0,vmax)*random([0,1]);
   }
   if (ypos[i]>height/2){
     yvels[i] = random(-vmax,0)*random([0,1]);
   }
   else {
     yvels[i] = random(0,vmax)*random([0,1]);
   }


   subwayLines.push(new Orbiter(createVector(xpos[i],ypos[i]),createVector(xvels[i],yvels[i]),createVector(0,0),masses[i], colors[i]));
   paths.push(new Path(colors[i]));
}

}

function draw(){
background(208,64.9,77.6);



  for (var k = 0; k < 4; k++) {
      SubwaySystem.kinematics(.125); // higher values speed up simulation
  }
  for (l=0;l<subwayLines.length;l++){
    paths[l].update(l);
    paths[l].displayLand();
  }
  for (l=0;l<subwayLines.length;l++){
    paths[l].display();
  }


  for (j = 0;j<junctions.length;j++){
      push()
      fill(255);
      stroke(0)
      strokeWeight(2)
      ellipse(junctions[j].x,junctions[j].y, 10,10);
      pop()
    }


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
    if(subwayLines[whichOrb].position.x>.001){
    this.points.push(new createVector(subwayLines[whichOrb].position.x,subwayLines[whichOrb].position.y))
  }
  }
}
Path.prototype.displayLand = function(){
  push()
  //stroke()
  noFill();
  strokeCap(ROUND);
  stroke(47,45.8,88.4)
  strokeWeight(80);
  beginShape();
  for (i=0;i<this.points.length;i++)
    {
      curveVertex(this.points[i].x,this.points[i].y)
    }
  endShape();

  pop()

}
Path.prototype.display = function(){

push()
noFill();
stroke(this.color);
strokeCap(ROUND);

strokeWeight(8);
beginShape();
for (i=0;i<this.points.length;i++)
  {
    curveVertex(this.points[i].x,this.points[i].y)
  }
endShape();
pop();

}




function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

function touchEnded(){
    for ( i = subwayLines.length-1; i >= 0; i--){
      subwayLines.splice(i,1);
      paths.splice(i,1);
      clear()
      //background(161,201,235);
    }
    for ( i = junctions.length-1; i >= 0; i--){
      junctions.splice(i,1);
    }
    spawn9Bodies();
    return false;
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('subwaymap', 'png');

  }
}
