var Orbiter = function(position, velocity, acceleration, mass, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = Math.pow(mass,.333)*2
this.color = color;
this.collisioncounter = 0
}

//not actually drawing these

Orbiter.prototype.display = function(){
  if (this.collisioncounter>60){
   push();
   noStroke();
   fill(this.color)
   ellipse(this.position.x, this.position.y, 7, 7)
   pop();
 }



}
