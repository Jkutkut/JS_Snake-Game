var snake;
var selectedSnake = 0;
var snakeTypes = [RainbowSnake, MultipleRainbowSnake, Snake];
var currentColor = [0, 255, 0];
var rowCol = 20;
var w;
var nApple = 2;
var apple;


var score, scoreHTML, highscore = 0,startDelay;

var conv = new Map();
var convDebug = new Map();

function preload() {
  // the selector will match all input controls of type :checkbox
  // and attach a click event handler 
  $("input:checkbox").on('click', function() {
    let $box = $(this);
    if ($box.is(":checked")) {
      let group = "input:checkbox[name='" + $box.attr("name") + "']"; // get  group of checkboxes

      $(group).prop("checked", false); // uncheck all
      $box.prop("checked", true); // Check the selected

      selectedSnake = Number.parseInt($box.attr("value"));
      if (selectedSnake == 2) {
        $('#colorPdiv').show();
      }
      else {
        $('#colorPdiv').hide();
      }
      setup();
    } 
    else {
      $box.prop("checked", false);
    }
  });

  $('#colorP').minicolors({
    // animation speed
    animationSpeed: 50,

    // easing function
    animationEasing:'swing',

    // defers the change event from firing while the user makes a selection
    changeDelay: 0,

    // hue, brightness, saturation, or wheel
    control:'wheel',

    // default color
    defaultValue:'#00FF00',

    // hex or rgb
    format:'rgb',

    // show/hide speed
    showSpeed: 100,
    hideSpeed: 100,

    // is inline mode?
    inline:false,

    // a comma-separated list of keywords that the control should accept (e.g. inherit, transparent, initial).
    keywords:'',

    // uppercase or lowercase
    letterCase:'lowercase',

    // enables opacity slider
    opacity:false,
    
    // additional theme class
    theme:'default',

    // an array of colors that will show up under the main color <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
    swatches: [],

    // Fires when the color picker is hidden.
    hide: function() {
      let c = $("#colorP").attr("value");
      currentColor = c.substring(4, c.length-1).replace(/ /g, '').split(',');
      setup();
    }
  });

  $('#colorPdiv').hide();
  $("input:checkbox")[0].checked = true; // On start, check the first option
}

function setup() {
  createCanvas(500, 500);
  frameRate(8);
  w = width / rowCol;

  snake = new snakeTypes[selectedSnake](rowCol / 2, rowCol / 2, currentColor);
  
  apple = [];
  score = 0;
  startDelay = 30;
  
  conv.set(87, [0, -1]);
  conv.set(65, [-1, 0]);
  conv.set(83, [0, 1]);
  conv.set(68, [1, 0]);
  
  convDebug.set(87, 'w');
  convDebug.set(65, 'a');
  convDebug.set(83, 's');
  convDebug.set(68, 'd');
  convDebug.set(82, 'r');
  
  scoreHTML = document.getElementById("score");
  scoreHTML.innerHTML = "Score: " + score + "     Highscore: " + highscore;
  scoreHTML.style.color = "#00000";
}


function draw() {
  if(score !== -1){//if not in Game Over
    fill(255);
    for(let i = 0; i < rowCol; i++){//draw grid
      for(let j = 0; j < rowCol; j++){
        rect(i * w, j * w, w, w);
      }
    }
    while(nApple > apple.length){ //summon apples
      let a = [Math.floor(random() * rowCol), Math.floor(random() * rowCol)];
      let inUse = false;
      let body = snake.body;
      for(let i = 0; i < body.length; i++){
        if(a[0] == body[i][0] && a[1] == body[i][1]){
          inUse = true;
          break;
        }
      }
      if(!inUse){
        apple.push(a);
      }
    }
    for(let i = 0; i < apple.length; i++){//draw apples
      fill(color(255, 100, 100));
      rect(apple[i][0] * w, apple[i][1] * w, w, w);
    }


    if(startDelay-- < 0){
      scoreHTML.innerHTML = "Score: " + score + "     Highscore: " + highscore;

      if(snake.checkError()){
        let snake2 = snake;
        snake2.move();
        if(snake2.checkError()){
          //noLoop();
          console.log("game over");
          score = -1;
        } 
      }

      snake.move();

      //if apple eaten, grow
      for(let i = 0; i < apple.length; i++){
        if(apple[i][0] == snake.body[0][0] && apple[i][1] == snake.body[0][1]){
          snake.grow();
          apple.splice(i, 1);
          score += 10;
          if(score > highscore){
            highscore = score;
            scoreHTML.style.textColor = "#56fc03";
          }
        }
      }

    }
    else{
      snake.show();
    }
  }
}

function keyPressed() {
  if(conv.has(keyCode)){//w, a, s, d.
    snake.direction = conv.get(keyCode);
  }
  else if(keyCode == 82){//if r pressed -> reset game
    setup();
  }
}