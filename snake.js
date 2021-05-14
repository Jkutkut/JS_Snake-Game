class Snake {
    constructor(x, y) {
        this._direction = [0, 1];
        this._body = [[x, y]];
        this.needToGrow = 3;
    }

    /**
     * Array with all the pieces of the body.
     * @see The first one is the head
     */
    get body() {
        return this._body;
    }

    /**
     * Array with the 2D coordinates of the direction.
     */
    get direction() {
        return this._direction;
    }

    /**
     * Makes the snake grow one unit.
     */
    grow() {
        this.needToGrow++;
    }

    /**
     * Changes the direction of the skake
     * @param dir (Array) Array with the 2D coordinates of the new direction.
     * @see Both [X, Y] need to be integers and dir a normal vector in order to work as intended.
     * 
     * @todo
     */
    set direction(dir) {

        if(dir[0] + this.direction[0] !== 0 && dir[1] + this.direction[1] !== 0){
            this._direction = dir;
        }
    }


    /**
     * Moves the snake one unit in the current direction.
     * @see Snake.direction
     */
    move() {
        if(!this.checkError()){
            this.body.unshift([this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]]);
            if(this.needToGrow <= 0){ // If no need to grow
              this.body.splice(this.body.length - 1, 1);
              // go foward === growing at beginning and removing last bit 
            }
            else{
              this.needToGrow--;
            }
          }
          this.show(); // Update the view.
    }


    /**
     * Checks whenever the snake is on an invalid position.
     * @returns boolean result.
     */
    checkError() {
        let hx = this.body[0][0]  + this.direction[0];
        let hy = this.body[0][1] + this.direction[1];
        let e = hx < 0 || hy < 0 || hx > rowCol - 1 || hy > rowCol - 1;
        if(e){ // If next position will not be valid (out of the wold)
            return true;
        }
        
        for(let i = 1; i < this.body.length; i++){ // for each piece
            if(this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]){
                return true; // if head eating part of the body => error
            }
        }
        return false;
    }

    /**
     * Represents the snake on the p5.js canvas.
     */
    show() {}
}

class RainbowSnake extends Snake {
    constructor(x, y) {
        super(x, y);
    }

    show() {
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

class MultipleRainbowSnake extends Snake {
    constructor (x, y, increment=30) {
        super(x, y);
        this.initialColor = {
            x: 153,
            g: 153,
            b: 255
        };
        this.increment = increment;
    }

    show() {
        stroke(0);
        strokeWeight(2);
        
        
        //multi rainbow
        let r = this.initialColor.x;
        let g = this.initialColor.g;
        let b = this.initialColor.b;
        let increment = this.increment;
        let dr = increment, dg = 0, db = 0;
        
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