var Orbiter = function(position, velocity, acceleration, mass, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = Math.pow(mass,.333)*1
this.color = color;
this.c = 0
this.alive = true;
}

Orbiter.prototype.display = function(){
   push();
   noStroke();
   fill(this.color)
   //triangle(this.position.x, this.position.y, this.position.x+10, this.position.y, this.position.x-5, this.position.y+10)
   //circle(this.position.x+random(-2,2), this.position.y+random(-2,2), this.radius*randomGaussian())
   //rotate(atan2(this.position.y/this.position.x))
   velScale = map(this.velocity.mag(),10,0,1.5,1)
   circle(this.position.x+random(-2,2), this.position.y+random(-2,2),this.radius*randomGaussian(1,.4)/velScale)
   //rotate(.5)
   //ellipse(this.position.x, this.position.y,this.radius,this.radius*.5/this.velocity.mag())
   pop();
  //this.c++
  // if(this.c % 5 == 0){
  //   Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  // }


}
