function snakeBody(x, y){
  this.direction = [0, 1];
  this.body = [[x,y]];
  this.needToGrow = 3;
  
  this.move = function(){
    if(!this.checkError()){
      this.body.unshift([this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]]);
      if(this.needToGrow <= 0){//no need to grow
        this.body.splice(this.body.length - 1, 1);
        //go foward === growing at beginning and removing last bit 
      }
      else{
        this.needToGrow--;
      }
    }
    this.show();
  }
  
  this.setDirection = function(dir){
    if(dir[0] + this.direction[0] !== 0 && dir[1] + this.direction[1] !== 0){
      this.direction = dir;
    }
  }
  
  this.grow = function(){
    //this.needToGrow += 1000;
    this.needToGrow++;
    
  }
  
  this.checkError = function(){
    //return (if error)
    let hx = this.body[0][0]  + this.direction[0];
    let hy = this.body[0][1] + this.direction[1];
    let e = hx < 0 || hy < 0 || hx > rowCol - 1 || hy > rowCol - 1;
    if(e){
      return true;
    }
    
    for(let i = 1; i < this.body.length; i++){
      if(this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]){
        return true;
      }
    }
    //if eating tail -> false?
    return false;
  }
  
  
  this.show = function(){
    stroke(0);
    strokeWeight(2);
    
    //Single rainbow
    //in total: 6 * 255 values (regular hsv)
    let r = 255;
    let g = 0;
    let b = 0;
    let increment = Math.floor(6 * 255 / this.body.length);
    let dr = 0, dg = increment, db = 0;

    
    for(let i = 0; i < this.body.length; i++){
      fill(color(r, g, b));
      rect(this.body[i][0] * w, this.body[i][1] * w, w, w);

      r += dr;
      g += dg;
      b += db;

      if(r > 255){//r max
        r = 255;
        dr = 0;
        db = -increment;
      }
      else if(g > 255){//g max
        g = 255;
        dg = 0;
        dr = -increment;
        }
      else if(b > 255){//b max
        b = 255;
        db = 0;
        dg = -increment;
      }


      else if(r < 0){//r min
        r = 0;
        dr = 0;
        db = increment;
      }
      else if(g < 0){//g min
        g = 0;
        dg = 0;
        dr = increment;
      }
      else if(b < 0){//b min
        b = 0;
        dg = 0;
        dg = increment;
      }
    }
  }

}