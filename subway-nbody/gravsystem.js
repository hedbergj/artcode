
var GravitationallyBoundSystem = function(theBodies) {
 this.theBodies = theBodies;
}

GravitationallyBoundSystem.prototype.calcForces = function() {
    for (var i = 0; i < this.theBodies.length; i++) {
        var p = this.theBodies[i];

        p.acceleration.set(0);

        for (var j = 0; j < i; j++) {
            var p2 = subwayLines[j];
            var d = p5.Vector.sub(p.position, p2.position);
            var norm = Math.sqrt(6 + d.magSq());
            var mag = bigG / (norm * norm * norm);
            p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)))
            p2.acceleration.add(p5.Vector.mult(d,(mag * p.mass)))
        }
    }
}

GravitationallyBoundSystem.prototype.checkAllCollisions = function() {
    for (var i = 0; i < this.theBodies.length; i++) {
        var p = subwayLines[i];
        p.collisioncounter++;
        for (var j = 0; j < i; j++) {
            var p2 = subwayLines[j];
            if (p.collisioncounter > 100){
             if (this.checkCollision(p, p2)) {
               collisionPos = p5.Vector.div(p5.Vector.add(p5.Vector.mult(p.position,p.mass),p5.Vector.mult(p2.position,p2.mass)),p.mass*2)
               junctions.push(new createVector(collisionPos.x,collisionPos.y))
              }
            }
        }
    }
}

GravitationallyBoundSystem.prototype.checkCollision = function(a,b){
  var d = p5.Vector.sub(a.position,b.position)
  var r = a.radius+2+b.radius
    if (d.magSq() < r*r){
      a.collisioncounter = 0;
      b.collisioncounter = 0;
      return true;
    }
    else{
      return false;
    }
}



GravitationallyBoundSystem.prototype.kinematics = function(dt) {
    for (var i1 = 0; i1 < this.theBodies.length; i1++) {
        var p1 = this.theBodies[i1];
        p1.position.add(p5.Vector.mult(p1.velocity, 0.5 * dt));
        }
    this.calcForces();
    for (var i2 = 0; i2 < this.theBodies.length; i2++) {
        var p2 = this.theBodies[i2];
        p2.velocity.add(p5.Vector.mult(p2.acceleration,dt));
    }
    for (var i3 = 0; i3 < this.theBodies.length; i3++) {
        var p3 = this.theBodies[i3];
        p3.position.add(p5.Vector.mult(p3.velocity,0.5 * dt));
    }
    this.checkAllCollisions();


}
