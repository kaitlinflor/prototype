// Adapted from https://p5js.org/examples/interaction-snake-game.html

var socket = new WebSocket("ws://cpsc484-04.yale.internal:8888/frames");

var host = "cpsc484-04.yale.internal:8888";

$(document).ready(function() {
    frames.start();
    twod.start();
});


var command = null;

var frames = {
socket: null,

start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
        var command = frames.get_right_hand(JSON.parse(event.data));
        if (command !== null) {
        sendHandCommand(command);
        }
    }
},
}



var twod = {
    socket: null,

    start: function() {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function(event) {
        twod.show(JSON.parse(event.data));
        }
    },  

    show: function(twod) {
        $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
    }
};

function setup() {
  // get the dimensions of the parent HTML element
    height = document.getElementById('sketch-holder').clientHeight;
    width = document.getElementById('sketch-holder').clientWidth;

  // create canvas
    var canvas = createCanvas(width, height);

  // stretch canvas to fit dimensions of parent
    canvas.parent('sketch-holder');
    canvas.width = width;
    canvas.height = height;
    
}


const countdownEl = document.getElementById("countdown");

  // set the initial countdown value
let countdownValue = 5;
countdownEl.innerHTML = countdownValue;

  // start the countdown timer
const countdownTimer = setInterval(function() {
    countdownValue--;
    countdownEl.innerHTML = countdownValue;
    if (countdownValue === 0) {
        clearInterval(countdownTimer);
        window.location.href = "../2_survey1/index.html";
    }
}, 1000);