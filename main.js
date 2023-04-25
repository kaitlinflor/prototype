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
                target = detect_target(JSON.parse(event.data));
                localStorage.setItem('target', target)
                console.log("Checking");
            }

            if (target !== null) {

                if(is_present(JSON.parse(event.data), target) != null){
                    // console.log(target);
                    command = getHandPos(JSON.parse(event.data), target);
                    sendHandCommand(command);

                }
                else {
                    target = null;
                    document.getElementById('curs').style.visibility = 'hidden';
                }

            }
        }
    }
}

//     // show: function (frame) {
//     //     console.log(frame);
//     // }

//     detect_target: function (frame) {
//         var command = null;
//         if (frame.people.length < 1) {
//             return command;
//         }

//         // Normalize by subtracting the root (pelvis) joint coordinates

//         for (let i = 0; i < frame.people.length; i++){

//             // var pelvis_x = frame.people[i].joints[0].position.x;
//             var pelvis_y = frame.people[i].joints[0].position.y;
//             var pelvis_z = frame.people[i].joints[0].position.z;
//             var right_hand_y = (frame.people[i].joints[15].position.y - pelvis_y) * -1;
//             var right_hand_z = (frame.people[i].joints[15].position.z - pelvis_z) * -1;

//             if (right_hand_z >= 120 && right_hand_y > 700) {
//                 return frame.people[i].body_id;
//             }

//         }
//         return command;
//     }
// };


// function is_present(frame, target) {

//     for (let i = 0; i < frame.people.length; i++){

//         if (frame.people[i].body_id == target){

//             return i;
//         }
//     }

//     return null;
// }


function getHandPos(frame, target) {

    command = null;

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
    document.getElementById('t2').style.right = (right_pos + .29).toString().concat("%");
    document.getElementById('t3').style.right = (right_pos - .45).toString().concat("%");

    var curs_pos = document.getElementById('t').getBoundingClientRect();
    var cx = curs_pos.left + curs_pos.width * 0.5;    // find center of first image
    var cy = curs_pos.top + curs_pos.height * 0.5;

    const buttons = document.querySelectorAll("div.selector");

    // console.log("buttons = " + buttons.length);

    for (let i = 0; i < buttons.length; i++) {

        const button = buttons[i];
        const rect = button.getBoundingClientRect();

        // check if the cursor is within the bounding box of the image
        if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
            // console.log("Cursor is hovering over image", image);
            command = i;
            // console.log(command);
        }

        if (command == null) {
            command = null;
            resetTimer();
            // removeBorder();
        }

        return command;
    }
}

function sendHandCommand(command) {
    switch (command) {
    case 0:
        startTimer(0)
        // addBorder(0)
        break;
    }
}


// Start Timer
function startTimer(number) {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            time--;
            countdownTimer.innerHTML = `${time}`;
            if (time === 0) {
                clearInterval(timerInterval);
                // document.getElementById("popup").style.display = "block";
                // document.getElementById("popup").style.pointerEvents = "auto";

                // const images = document.querySelectorAll(".chosen");
                // images.forEach((image, i) => {
                // if (i === number) {
                //     image.style.display = "block";
                //     } else {
                //         image.style.display = "none";
                //     }
                //     });


                if (number == 0){
                    console.log("number = " + number);
                    setTimeout(function() {
                        window.location.href = "1_instructions/index.html";
                    }, 3000);
                }

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


// function removeBorder(number) {
//     for (let i = 0; i < 4; i++) {
//         let images = document.getElementsByTagName("img");
//         images[i].style.border = "3px solid white"
//     }
// }