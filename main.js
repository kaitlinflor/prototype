// Server_Name = cpsc484-02.yale.internal
// var socket = new WebSocket("ws://cpsc484-03.yale.internal:8888/frames");
// var socket = new WebSocket("ws://[Server_Name]:8888/frames");
var host = "cpsc484-03.yale.internal:8888";
// var host = "127.0.0.1:4444";

var target = null;

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

            if(target == null){
                target = frames.get_right_hand_command(JSON.parse(event.data));
                console.log("Checking");
            }

            if (target !== null) {

                if(is_present(JSON.parse(event.data), target) != null){
                    // console.log(target);
                    sendHandCommand(JSON.parse(event.data), target);

                }
                else {
                    target = null;
                    document.getElementById('curs').style.visibility = 'hidden';
                }

            }
        }
    },

    // show: function (frame) {
    //     console.log(frame);
    // }

    get_right_hand_command: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }

        // Normalize by subtracting the root (pelvis) joint coordinates

        for (let i = 0; i < frame.people.length; i++){

            // var pelvis_x = frame.people[i].joints[0].position.x;
            var pelvis_y = frame.people[i].joints[0].position.y;
            var pelvis_z = frame.people[i].joints[0].position.z;
            var right_hand_y = (frame.people[i].joints[15].position.y - pelvis_y) * -1;
            var right_hand_z = (frame.people[i].joints[15].position.z - pelvis_z) * -1;

            if (right_hand_z >= 120 && right_hand_y > 700) {
                return frame.people[i].body_id;
            }

        }
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

    return null;
}


function sendHandCommand(frame, target) {

    document.getElementById('curs').style.visibility = 'visible';

    var person = is_present(frame, target);
    var right_hand_x = frame.people[person].joints[15].pixel.x;
    var right_hand_y = frame.people[person].joints[15].pixel.y;

    // var display_x = right_hand_x * (1920/1280);
    // var display_y = right_hand_y * (1080/720);

    var top_pos = right_hand_y / 720  * 100;
    var right_pos = right_hand_x / 1280 * 100;

    // console.log("y_pos = " + right_hand_y);
    // console.log("y = " + top_pos);

    document.getElementById('t').style.top = top_pos.toString().concat("%");
    document.getElementById('t2').style.top = (top_pos + .6).toString().concat("%");
    document.getElementById('t3').style.top = (top_pos + .6).toString().concat("%");

    document.getElementById('t').style.right = right_pos.toString().concat("%");
    document.getElementById('t2').style.right = (right_pos + .43).toString().concat("%");
    document.getElementById('t3').style.right = (right_pos + .45).toString().concat("%");

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