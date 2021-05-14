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
    for(let i = 0; i < this.body.length; i++){
      fill(color(0, 255, 0));
      rect(this.body[i][0] * w, this.body[i][1] * w, w, w);
    }
  }

}