class SnakePrototype {
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
        let nextMove = [this.body[0][0] + dir[0], this.body[0][1] + dir[1]];
        for (let p of this.body) {
            if (nextMove == p) {
                return;
            }
        }

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

class RainbowSnake extends SnakePrototype {
    constructor(x, y) {
        super(x, y);
    }

    /**
     * Starting color of the snake (the color of the head).
     * @return (Obj) initial color: {r: R, g: G, b:B}.
     */
    get initialColor() {
        return {
            r: 255,
            g: 0,
            b: 0
        };
    }

    /**
     * The snake will change its color following this initial direction.
     * @see colorIncrement
     * @return (Obj) delta color: {r: R, g: G, b:B}; where R,G and B are either 1 or 0.
     */
    get initialColorDelta() {
        return {
            r: 0,
            g: 1,
            b: 0
        };
    }

    /**
     * The amount of color changed on each piece.
     */
    get colorIncrement() {
        return Math.floor(6 * 255 / this.body.length);
    }

    show() {
        stroke(0);
        strokeWeight(2);
        
        //Single rainbow
        //in total: 6 * 255 values (regular hsv)
        let r = this.initialColor.r;
        let g = this.initialColor.g;
        let b = this.initialColor.b;
        let increment = this.colorIncrement;
        let dr = this.initialColorDelta.r * increment;
        let dg = this.initialColorDelta.g * increment;
        let db = this.initialColorDelta.b * increment;

        
        for(let i = 0; i < this.body.length; i++){
            push();
            fill(r, g, b);
            rect(this.body[i][0] * w, this.body[i][1] * w, w, w);
            pop();
            
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

class MultipleRainbowSnake extends RainbowSnake {
    constructor (x, y) {
        super(x, y);
        this._increment = 30;
    }

    get initialColor() {
        return {
            r: 153,
            g: 153,
            b: 255
        };
    };

    get initialColorDelta() {
        return {
            r: 1,
            g: 0,
            b: 0
        };
    }

    get colorIncrement() {
        return this._increment; // constant
    }
}

class Snake extends SnakePrototype {
    constructor(x, y, c=[0, 255, 0]) {
        super(x, y);

        this.color = c;
    }

    set color(c) {
        if (!(c instanceof Array) || c.length != 3) {
            throw new Error("The color is not valid");
        }
        this._color = c;
    }

    get color() {
        return this._color;
    }

    show() {
        push();
        stroke(0);
        strokeWeight(2);
        fill(...this.color);
        for(let i = 0; i < this.body.length; i++){
          rect(this.body[i][0] * w, this.body[i][1] * w, w, w);
        }
        pop();
      }
}