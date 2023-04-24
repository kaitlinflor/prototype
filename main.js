// Server_Name = cpsc484-02.yale.internal
// var socket = new WebSocket("ws://cpsc484-03.yale.internal:8888/frames");
// var socket = new WebSocket("ws://[Server_Name]:8888/frames");
var host = "cpsc484-03.yale.internal:8888";
// var host = "127.0.0.1:4444";

$(document).ready(function () {
    frames.start();
    // twod.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            // frames.show(JSON.parse(event.data));
            var target = frames.get_right_wrist_command(JSON.parse(event.data));
            if (target !== null) {
                // sendWristCommand(JSON.parse(event.data), target);

                while(is_present(JSON.parse(event.data), target) != null){

                    var elem = document.getElementById('curs');
                    console.log(target);

                    // if(elem.style.visibility == 'hidden') {

                    // //     elem.style.visibility = 'visible';
                    //     console.log(target);
                    // }
                    // console.log(elem);
                    // sendWristCommand(JSON.parse(event.data), target);

                }

            }
        }
    },

    // show: function (frame) {
    //     console.log(frame);
    // }

    get_right_wrist_command: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }

        // Normalize by subtracting the root (pelvis) joint coordinates

        for (let i = 0; i < frame.people.length; i++){

            var pelvis_x = frame.people[i].joints[0].position.x;
            var pelvis_y = frame.people[i].joints[0].position.y;
            var pelvis_z = frame.people[i].joints[0].position.z;
            var right_wrist_x = (frame.people[i].joints[14].position.x - pelvis_x) * -1;
            var right_wrist_y = (frame.people[i].joints[14].position.y - pelvis_y) * -1;
            var right_wrist_z = (frame.people[i].joints[14].position.z - pelvis_z) * -1;

            if (right_wrist_z >= 120 && right_wrist_y > 500) {
                return frame.people[i].body_id;
            }

        }

        // if (left_wrist_z < 100) {
        //   return command;
        // }

        // if (left_wrist_x < 200 && left_wrist_x > -200) {
        //   if (left_wrist_y > 500) {
        //     command = 73; // UP
        //   } else if (left_wrist_y < 100) {
        //     command = 75; // DOWN
        //   }
        // } else if (left_wrist_y < 500 && left_wrist_y > 100) {
        //   if (left_wrist_x > 200) {
        //     command = 76; // RIGHT
        //   } else if (left_wrist_x < -200) {
        //     command = 74; // LEFT
        //   }
        // }
        return command;
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

function is_present(frame, target) {

    for (let i = 0; i < frame.people.length; i++){

        if (frame.people[i].body_id == target){

            return i;
        }
    }

    return false;
}


function sendWristCommand(frame, target) {

    var person = is_present(frame, target);
    var right_wrist_x = frame.people[person].joints[14].position.x;
    var right_wrist_y = frame.people[person].joints[14].position.y;

    var display_x = right_wrist_x * (1920/1280);
    var display_y = right_wrist_y * (1080/720);

    var tr_1 = document.getElementById('triangle');
    var tr_2 = document.getElementById('triangle2');
    var tr_3 = document.getElementById('triangle3');


    console.log(right_wrist_x);
    console.log(right_wrist_y);

}

// var twod = {
//     socket: null,

//     // create a connection to the camera feed
//     start: function () {
//         var url = "ws://" + host + "/twod";
//         twod.socket = new WebSocket(url);

//         // whenever a new frame is received...
//         twod.socket.onmessage = function (event) {

//             // parse and show the raw data
//             twod.show(JSON.parse(event.data));
//         }
//     },

//     // show the image by adjusting the source attribute of the HTML img object previously created
//     show: function (twod) {
//         $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
//     },
// };