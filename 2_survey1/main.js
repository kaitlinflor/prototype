// Adapted from https://p5js.org/examples/interaction-snake-game.html

var socket = new WebSocket("ws://cpsc484-04.yale.internal:8888/frames");

var host = "cpsc484-04.yale.internal:8888";

window.onload = function() {
  setup();
};

$(document).ready(function() {
  frames.start();
  twod.start();
});

var command = null;
var tracked_person_id = null;
// console.log(tracked_person_id)

const images = document.querySelectorAll("img.selector");

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

  get_right_hand: function (frame) {
    if (frame.people.length < 1) {
      return null;
    }
  
    if (tracked_person_id == null) {
      var min_z = Number.MAX_SAFE_INTEGER;
      for (var i = 0; i < frame.people.length; i++) {
        var person_z = frame.people[i].joints[0].position.z;
        if (person_z < min_z) {
          min_z = person_z;
          tracked_person_id = frame.people[i].body_id;
        }
      }
      // If we haven't started tracking anyone yet, track the first person
      // tracked_person_id = frame.people[0].body_id;
    }

  
    // Find the person we're tracking
    var tracked_person = null;
    for (var i = 0; i < frame.people.length; i++) {
      if (frame.people[i].body_id === tracked_person_id) {
        tracked_person = frame.people[i];
        break;
      }
    }
  
    if (tracked_person === null) {
      // If we couldn't find the person we're tracking, stop tracking
      tracked_person_id = null;
      return null;
      console.log("COULDN'T FIND")
    }

    command = null;
    // Normalize by subtracting the root (pelvis) joint coordinates
    var num_people = frame.people.length;
    var right_hand_x = tracked_person.joints[15].position.x*(-1) + width/2;
    var right_hand_y = tracked_person.joints[15].position.y;
    // var right_hand_z = tracked_person.joints[15].position.z*(-1);

    let myImage = document.getElementById("myImage");
    myImage.style.left = right_hand_x + "px";
    myImage.style.top = right_hand_y + "px";
    
    var rect1 = myImage.getBoundingClientRect();
    var cx = rect1.left + rect1.width * 0.5;    // find center of first image
    var cy = rect1.top + rect1.height * 0.5;
    
      // get all images with the class name "selector" on the page
    const images = document.querySelectorAll("img.selector");

    // loop through each image and check if the cursor is hovering over it

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const rect = image.getBoundingClientRect(); // get the bounding box of the image

      // check if the cursor is within the bounding box of the image
      if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
        // console.log("Cursor is hovering over image", image);
        command = i;
        // console.log(command);
      }

    }
    if (command == null) {

      command = null;
      removeBorder();
      resetTimer();
    }


    return command;
    
  }
};

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

function sendHandCommand(command) {
  switch (command) {
    case 0:
      startTimer(0)
      addBorder(0)
      break;
    case 1:
      startTimer(1)
      addBorder(1)
      break;
    case 2:
      startTimer(2)
      addBorder(2)
      break;
    case 3:
      addBorder(3)
      startTimer(3)
      break;
    case 4:
      addBorder(4)
      startTimer(4)
      break;
  }
}

function addBorder(number) {
  let images = document.getElementsByTagName("img");
  for (let i = 0; i < 5; i++) {
    if (i == number){
      images[i].style.border = "3px solid black"
    }
    else {
      images[i].style.border = "3px solid white"
    }
  }
}

function removeBorder(number) {
  for (let i = 0; i < 5; i++) {
      images[i].style.border = "3px solid white"
  }
}

let timerInterval = null;
const startingTime = 3;
let time = startingTime;
const countdownTimer = document.getElementById("timer");
const image_num = 0;

const images_for_selector = document.querySelectorAll(".selector");


// Start Timer
function startTimer(number) {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            time--;
            countdownTimer.innerHTML = `${time}`;
            if (time === 0) {
                clearInterval(timerInterval);
                document.getElementById("popup").style.display = "block";
                document.getElementById("popup").style.pointerEvents = "auto";

                const images = document.querySelectorAll(".chosen");
                images.forEach((image, i) => {
                  if (i === number) {
                    image.style.display = "block";
                  } else {
                    image.style.display = "none";
                  }
                });


                setTimeout(function() {
                  window.location.href = "../3_trivia1/index.html";
                }, 3000);
                
            }
        }, 1000);
    }
}

// Reset Timer
function resetTimer() {
  time = startingTime;
  countdownTimer.innerHTML = `${time}`;
  clearInterval(timerInterval);
  timerInterval = null;
}