// // Server_Name = cpsc484-02.yale.internal
// var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");
// // var socket = new WebSocket("ws://[Server_Name]:8888/frames");
// var host = "cpsc484-01.yale.internal:8888";

// $(document).ready(function () {
//     frames.start();
// });

// var frames = {
//     socket: null,

//     start: function () {
//         var url = "ws://" + host + "/frames";
//         frames.socket = new WebSocket(url);
//         frames.socket.onmessage = function (event) {
//             frames.show(JSON.parse(event.data));
//         }
//     },

//     show: function (frame) {
//         console.log(frame);
//     }
// };

var results = 15;

      if (results >= 1 && results <= 8) {
          document.getElementById("advice").innerHTML = "You seem to be doing pretty well! Still, make a point of frequently checking in with friends or family for your own sake as well as theirs. It’s important to ask the people in your life how they’re doing, and to speak about your own feelings often too. Make sure that they feel seen and that they know they can always talk to you.";
      }
      else if (results >= 9 && results <= 18) {
          document.getElementById("advice").innerHTML = "It seems like you’re facing some mental health challenges in your life. Make sure to reach out to your support circle, or if you feel like you don’t have anyone to talk to, look to speak to a professional. No mental health issue is ever too small to address! Sometimes, just speaking about your problems and having someone to validate your feelings can make a big difference in your mindset and mood.";
      }
      else if (results >= 19 && results <= 25) {
          document.getElementById("advice").innerHTML = "You might be going through a pretty hard time. Please reach out to your friends and family as well as a mental health professional, like a therapist or counselor, even if it may seem scary at first. It’s important to ask others for help, and no one will judge or condemn you for doing so. To the right, you’ll find the contact information for Yale Mental Health Care.";
      }

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