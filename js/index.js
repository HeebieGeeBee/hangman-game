// global variables
var usedLetters;
var score;
var wordMatch;
var word;
var wordArray;
var testArr;
var ricochet = new Audio();
ricochet.src = "sounds/NFF-fireball.wav";
var woodThud = new Audio();
woodThud.src = 'sounds/NFF-bump-wood.wav';
var wrong = new Audio();
wrong.src = "sounds/NFF-wrong-02.wav";
var winSound = new Audio();
winSound.src = "sounds/NFF-bulletin.wav";
var loseSound = new Audio();
loseSound.src = "sounds/NFF-retirement.wav";
var successSound = new Audio();
successSound.src = "sounds/NFF-success.wav";



//game function start
$(document).ready(function wordGame() {

  load();
  resetGame();
  muteButton();
 
}); //game function end

//letter input function
function letterInput(value) {

  //check for empty input box or non alphabet character
  var regex = /([^a-zA-Z])/g;
  var test = regex.test(value);
  if (value === '' || test) {
    repeatPlay(wrong);
    return;
  }

  //conparing input letter to used letters
 for (var j = 0; j < usedLetters.length; j++) {
    if (value === usedLetters[j]) {
      repeatPlay(wrong);
      return;
    }


}
  //score for every valid input
  score++;
// woodThud.muted = true;
  //comparing input letter to word letters
  for (var i = 0; i < wordArray.length; i++) {
    if (value === wordArray[i] ) {
      //place letter on keyBoard
      $(".letters-container > div:nth-child(" + (i + 1) + ")").append(value.toUpperCase()).css('background-color', 'red').animate({
        top: '0px'
      }, 200);
      //play correct noise
      repeatPlay(ricochet);
      
      wordMatch++;
      testArr.push(wordArray[i]);
    }
  }
  
  //play gallow noise if no success correct guess noise made
  if (ricochet.paused === true) {
    repeatPlay(woodThud);
  }
  
  testArr = testArr.filter(function(item, pos){
    return testArr.indexOf(item) == pos;
  });
    
  //run scoring function
  scoring();

  //push used letters into array
  usedLetters.push(value);
        
  // if they get the word
  if (wordMatch === wordArray.length) {
        newGameWin();
      }

  return;
} // letter input function end

//mute button function
var muteButton = function() {
  $('.mute').click(function(){
      if (ricochet.muted === false && woodThud.muted === false && wrong.muted === false && winSound.muted === false && loseSound.muted === false && successSound.muted === false) {
      ricochet.muted = true;
      woodThud.muted = true;
      wrong.muted = true;
      winSound.muted = true;
      loseSound.muted = true;
      successSound.muted = true;
      $('.mute').css('background', 'rgba(255,0,0,0.9').addClass('muted');
      } else {
        ricochet.muted = false;
        woodThud.muted = false;
        wrong.muted = false;
        winSound.muted = false;
        loseSound.muted = false;
        successSound.muted = false;
        $('.mute').css('background', '').removeClass('muted');
      }console.log(ricochet.muted);
  });

};

//clear letters div function
var clearLetters = function() {
  $('.letters-container').html('');
};

//reset global variables function
var resetGame = function() {
  clearLetters();
  resetKeyBoard();
  usedLetters = [];
  score = 0;
  wordMatch = 0;
  word = undefined;
  wordArray = [];
  testArr = [];
  drawBackground();
  setHangmanCanvas();
  wordGet();
  keyBoard();
  keyListener();
  $('body').focus();
};

//get random word function
var wordGet = function() {
  //get a random word
  word = wordBank[Math.floor(Math.random() * wordBank.length)];
  //convert word to an array
  wordArray = word.split('');
  //create div for each letter
  for (var i = 0; i < wordArray.length; i++) {
    $('.letters-container').append('<div class="letters"></div>');
  }
};

//keydown event listener
var keyListener = function() {
    $('body').keypress(function(event) {
    var str = String.fromCharCode(event.keyCode).toLowerCase();
    letterInput(str);
    $('button[id*=' + str + ']').attr('disabled', 'true');
  });
};

//scoring
var scoring = function() {
    if (score - testArr.length >= 11) {
    //dead eyes
    drawDeadEyes();
    newGameLose();
  } else if (score - testArr.length === 10) {
    //right arm
    drawRightArm();
  } else if (score - testArr.length === 9) {
    //left arm
    drawLeftArm();
  } else if (score - testArr.length === 8) {
    //right leg
    drawRightLeg();
  } else if (score - testArr.length === 7) {
    //left leg
    drawLeftLeg();
  } else if (score - testArr.length === 6) {
    //body
    drawBody();
  } else if (score - testArr.length === 5) {
    //head
    drawHead();
  } else if (score - testArr.length === 4) {
    //rope
    drawRope();
  } else if (score - testArr.length === 3) {
    //support
    drawSupport();
  } else if (score - testArr.length === 2) {
    //crossbar
    drawCrossBar();
  } else if (score - testArr.length === 1) {
    //upright
    drawUpright();
  }
};

//keyboard input function
var keyBoard = function() {
  
   $('#a').on('click', function(a){
    var str = "a";
   letterInput(str);
   $('#a').attr('disabled', 'true');
 });
$('#b').on('click', function(a){
    var str = "b";
   letterInput(str);
   $('#b').attr('disabled', 'true');
 });
 $('#c').on('click', function(a){
    var str = "c";
   letterInput(str);
   $('#c').attr('disabled', 'true');
 });
 $('#d').on('click', function(a){
    var str = "d";
   letterInput(str);
   $('#d').attr('disabled', 'true');
 });
 $('#e').on('click', function(a){
    var str = "e";
   letterInput(str);
   $('#e').attr('disabled', 'true');
 });
 $('#f').on('click', function(a){
    var str = "f";
   letterInput(str);
   $('#f').attr('disabled', 'true');
 });
 $('#g').on('click', function(a){
    var str = "g";
   letterInput(str);
   $('#g').attr('disabled', 'true');
 });
 $('#h').on('click', function(a){
    var str = "h";
   letterInput(str);
   $('#h').attr('disabled', 'true');
 });
 $('#i').on('click', function(a){
    var str = "i";
   letterInput(str);
   $('#i').attr('disabled', 'true');
 });
 $('#j').on('click', function(a){
    var str = "j";
   letterInput(str);
   $('#j').attr('disabled', 'true');
 });
 $('#k').on('click', function(a){
    var str = "k";
   letterInput(str);
   $('#k').attr('disabled', 'true');
 });
 $('#l').on('click', function(a){
    var str = "l";
   letterInput(str);
   $('#l').attr('disabled', 'true');
 });
 $('#m').on('click', function(a){
    var str = "m";
   letterInput(str);
   $('#m').attr('disabled', 'true');
 });
 $('#n').on('click', function(a){
    var str = "n";
   letterInput(str);
   $('#n').attr('disabled', 'true');
 });
 $('#o').on('click', function(a){
    var str = "o";
   letterInput(str);
   $('#o').attr('disabled', 'true');
 });
 $('#p').on('click', function(a){
    var str = "p";
   letterInput(str);
   $('#p').attr('disabled', 'true');
 });$('#q').on('click', function(a){
    var str = "q";
   letterInput(str);
   $('#q').attr('disabled', 'true');
 });$('#r').on('click', function(a){
    var str = "r";
   letterInput(str);
   $('#r').attr('disabled', 'true');
 });$('#s').on('click', function(a){
    var str = "s";
   letterInput(str);
   $('#s').attr('disabled', 'true');
 });$('#t').on('click', function(a){
    var str = "t";
   letterInput(str);
   $('#t').attr('disabled', 'true');
 });$('#u').on('click', function(a){
    var str = "u";
   letterInput(str);
   $('#u').attr('disabled', 'true');
 });$('#v').on('click', function(a){
    var str = "v";
   letterInput(str);
   $('#v').attr('disabled', 'true');
 });$('#w').on('click', function(a){
    var str = "w";
   letterInput(str);
   $('#w').attr('disabled', 'true');
 });$('#x').on('click', function(a){
    var str = "x";
   letterInput(str);
   $('#x').attr('disabled', 'true');
 });$('#y').on('click', function(a){
    var str = "y";
   letterInput(str);
   $('#y').attr('disabled', 'true');
 });$('#z').on('click', function(a){
    var str = "z";
   letterInput(str);
   $('#z').attr('disabled', 'true');
 });
}

//clear board on reset function
var resetKeyBoard = function() {
  $('#a').removeAttr('disabled');
  $('#b').removeAttr('disabled');
  $('#c').removeAttr('disabled');
  $('#d').removeAttr('disabled');
  $('#e').removeAttr('disabled');
  $('#f').removeAttr('disabled');
  $('#g').removeAttr('disabled');
  $('#h').removeAttr('disabled');
  $('#i').removeAttr('disabled');
  $('#j').removeAttr('disabled');
  $('#k').removeAttr('disabled');
  $('#l').removeAttr('disabled');
  $('#m').removeAttr('disabled');
  $('#n').removeAttr('disabled');
  $('#o').removeAttr('disabled');
  $('#p').removeAttr('disabled');
  $('#q').removeAttr('disabled');
  $('#r').removeAttr('disabled');
  $('#s').removeAttr('disabled');
  $('#t').removeAttr('disabled');
  $('#u').removeAttr('disabled');
  $('#v').removeAttr('disabled');
  $('#w').removeAttr('disabled');
  $('#x').removeAttr('disabled');
  $('#y').removeAttr('disabled');
  $('#z').removeAttr('disabled');
}

//sounds preload function
var load = function() {
  ricochet.preload = "auto";
  woodThud.preload = 'auto';
  wrong.preload = 'auto';
  winSound.preload = 'auto';
  loseSound.preload = 'auto';
  successSound.preload = 'auto';
};

//repeating sounds function
var repeatPlay = function(sound) {
   if (sound.paused) {
        sound.play();
    }else{
        sound.currentTime = 0;
    }
};

//win game button function
var newGameWin = function() {
  winSound.play();
  $('body').off();
  $('.win-modal').show(500);
  $('.win-modal').html('<p>Congratulations<br>You Win!<br>the word was<br>' + word.toUpperCase() + '!</p><br><button class="new-button">Play again?</button>')
  $('.new-button').focus();
  $('.new-button').on('click', function() {
    $('.win-modal').hide(1000);
    successSound.play();
    resetGame();
    
  });
}

//lose game button function
var newGameLose = function() {
  loseSound.play();
  $('body').off();
  $('.lose-modal').show(500);
  $('.lose-modal').html('<p>You Lose!<br>the word was<br>' + word.toUpperCase() + '!</p><br><button class="new-button">Play again?</button>')
  $('.new-button').focus();
  $('.new-button').on('click', function() {
    $('.lose-modal').hide(1000);
    successSound.play();
    resetGame();
    
  });
}

//draw background
var drawBackground = function() {
  var canvas2 = document.getElementById('bg-canvas');
  canvas2.width = canvas2.scrollWidth;
  canvas2.height = canvas2.scrollHeight;
  var ctx2 = canvas2.getContext('2d');
  //mountain range
  ctx2.fillStyle = '#C0ACCC';
  ctx2.strokeStyle = 'black';
  ctx2.beginPath();
  ctx2.moveTo(0, 200);
  ctx2.lineTo(40, 180);
  ctx2.lineTo(50, 190);
  ctx2.lineTo(64, 183);
  ctx2.lineTo(80, 192);
  ctx2.lineTo(103, 184);
  ctx2.lineTo(130, 180);
  ctx2.lineTo(170, 190);
  ctx2.lineTo(190, 190);
  ctx2.lineTo(214, 183);
  ctx2.lineTo(243, 192);
  ctx2.lineTo(258, 184);
  ctx2.lineTo(277, 180);
  ctx2.lineTo(296, 190);
  ctx2.lineTo(313, 184);
  ctx2.lineTo(343, 180);
  ctx2.lineTo(360, 190);
  ctx2.lineTo(360, 270);
  ctx2.lineTo(0, 270);
  ctx2.fill();
  //sand to foreground
  ctx2.fillStyle = '#FFF29F';
  ctx2.beginPath();
  ctx2.moveTo(0, 270);
  ctx2.lineTo(360, 270);
  ctx2.lineTo(360, 640);
  ctx2.lineTo(0, 640);
  ctx2.fill();
  ctx2.fillStyle = '#78992C';
  //draw cactus
  ctx2.beginPath();
  ctx2.arc(330, 250, 5, 0, Math.PI, true)
  ctx2.lineTo(325, 280);
  ctx2.lineTo(322, 282);
  ctx2.lineTo(320, 280);
  ctx2.lineTo(320, 260);
  ctx2.lineTo(318, 258);
  ctx2.lineTo(316, 260);
  ctx2.lineTo(316, 283);
  ctx2.lineTo(318, 284);
  ctx2.lineTo(320, 285);
  ctx2.lineTo(322, 286);
  ctx2.lineTo(325, 287);
  ctx2.lineTo(325, 300);
  ctx2.lineTo(335, 300);
  ctx2.lineTo(335, 290);
  ctx2.lineTo(337, 289);
  ctx2.lineTo(338, 288);
  ctx2.lineTo(339, 287);
  ctx2.lineTo(340, 286);
  ctx2.lineTo(340, 274);
  ctx2.lineTo(339, 273);
  ctx2.lineTo(338, 272);
  ctx2.lineTo(337, 284);
  ctx2.lineTo(336, 285);
  ctx2.lineTo(335, 286);
  ctx2.lineTo(335, 250);
  ctx2.fill();
}

//set hangman canvas size
var setHangmanCanvas = function() {
  var canvas = document.getElementById('hangman');
  canvas.width = canvas.scrollWidth;
  canvas.height = 200;
  var ctx = canvas.getContext('2d');
}

// draw gallows upright
var drawUpright = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(20, 10);
  ctx.lineTo(20, 180);
  ctx.lineTo(10, 180);
  ctx.lineTo(10, 10);
  ctx.fill();
  ctx.stroke();

};

//draw gallows crossbar
var drawCrossBar = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(5, 10);
  ctx.lineTo(130, 10);
  ctx.lineTo(130, 20);
  ctx.lineTo(5, 20);
  ctx.lineTo(5, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'grey';
  ctx.beginPath();
  ctx.arc(15, 15, 2, 0, Math.PI * 2)
  ctx.fill();
  ctx.stroke();
};

// draw gallows support beam
var drawSupport = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(65, 10);
  ctx.lineTo(80, 10);
  ctx.lineTo(10, 80);
  ctx.lineTo(10, 65);
  ctx.lineTo(65, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'grey';
  ctx.beginPath();
  ctx.arc(68, 15, 2, 0, Math.PI * 2)
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(15, 68, 2, 0, Math.PI * 2)
  ctx.fill();
  ctx.stroke();
};

// draw rope and noose
var drawRope = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(120, 7);
  ctx.lineTo(123, 7);
  ctx.lineTo(123, 23);
  ctx.lineTo(120, 23);
  ctx.lineTo(120, 7);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(123, 7);
  ctx.lineTo(126, 7);
  ctx.lineTo(126, 23);
  ctx.lineTo(123, 23);
  ctx.lineTo(123, 7);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(126, 7);
  ctx.lineTo(129, 7);
  ctx.lineTo(129, 23);
  ctx.lineTo(126, 23);
  ctx.lineTo(126, 7);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(123, 23);
  ctx.lineTo(126, 23);
  ctx.lineTo(126, 50);
  ctx.lineTo(123, 50);
  ctx.lineTo(123, 23);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(125, 60, 10, 0, Math.PI * 2, false);
  ctx.arc(125, 60, 7, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
};

//draw head
var drawHead = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(125, 55, 13, 0, Math.PI, true);
  ctx.lineTo(112, 65);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(125, 65, 13, 3.14159, 6.28319, true);
  ctx.lineTo(138, 55);
  ctx.fill();
  ctx.stroke();
};

//draw body
var drawBody = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'lightblue';
  ctx.beginPath();
  ctx.arc(125, 82, 4, 0, Math.PI, true);
  ctx.lineTo(121, 115);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(125, 115, 4, 3.14159, 6.28319, true);
  ctx.lineTo(129, 82);
  ctx.fill();
  ctx.stroke();
};

//draw left leg
var drawLeftLeg = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(125, 115);
  ctx.lineTo(129, 115);
  ctx.lineTo(135, 150);
  ctx.lineTo(131, 151);
  ctx.lineTo(125, 115);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(133, 150, 5, 0, Math.PI * 2);
  ctx.fill();
};

//draw right leg
var drawRightLeg = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(125, 115);
  ctx.lineTo(121, 115);
  ctx.lineTo(115, 150);
  ctx.lineTo(119, 151);
  ctx.lineTo(125, 115);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(117, 150, 5, 0, Math.PI * 2);
  ctx.fill();
};

//draw left arm
var drawLeftArm = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'lightblue';
  ctx.beginPath();
  ctx.moveTo(129, 82);
  ctx.lineTo(140, 110);
  ctx.lineTo(137, 110);
  ctx.lineTo(129, 84);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(139, 110, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};

//draw right arm
var drawRightArm = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'lightblue';
  ctx.beginPath();
  ctx.moveTo(121, 82);
  ctx.lineTo(110, 110);
  ctx.lineTo(113, 110);
  ctx.lineTo(121, 84);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(111, 110, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};

//draw dead eyes
var drawDeadEyes = function() {
  var canvas = document.getElementById('hangman');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(117, 55);
  ctx.lineTo(122, 65);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(122, 55);
  ctx.lineTo(117, 65);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(127, 55);
  ctx.lineTo(132, 65);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(132, 55);
  ctx.lineTo(127, 65);
  ctx.stroke();

};


//Word bank to choose random word from
var wordBank = ['age', 'ask', 'baby', 'base', 'beside', 'bright', 'business', 'buy', 'case', 'catch', 'caught', 'child', 'choose', 'circle', 'clear', 'color', 'copy', 'correct', 'could', 'difference', 'direction', 'dried', 'easily', 'edge', 'egg', 'eight', 'energy', 'england', 'especially', 'europe', 'exactly', 'except', 'explain', 'famous', 'farm', 'fell', 'figure', 'flat', 'fly', 'forest', 'free', 'french', 'fun', 'government', 'grass', 'grew', 'hair', 'happy', 'heat', 'history', 'human', 'inch', 'information', 'iron', 'king', 'larger', 'late', 'leg', 'length', 'listen', 'lost', 'lot', 'lower', 'machine', 'mark', 'maybe', 'measure', 'meet', 'middle', 'milk', 'minute', 'modern', 'moment', 'month', 'mouth', 'natural', 'nearly', 'necessary', 'north', 'object', 'ocean', 'oil', 'pay', 'per', 'plan', 'plane', 'present', 'product', 'rather', 'reach', 'reason', 'record', 'running', 'seems', 'sent', 'seven', 'shape', 'sides', 'single', 'skin', 'sleep', 'smaller', 'soft', 'soil', 'south', 'speak', 'speed', 'spring', 'square', 'star', 'step', 'store', 'straight', 'strange', 'street', 'subject', 'suppose', 'teacher', 'thousand', 'thus', 'travel', 'trip', 'trouble', 'unit', 'village', 'wall', 'war', 'week', 'whose', 'window', 'wish', 'women', 'wood', 'wrote', 'yellow', 'yourself'];