let timerInterval = null;
const startingTime = 3;
let time = startingTime;
const countdownTimer = document.getElementById("timer");
const image_num = 0;

let health_score = 0;
let quiz_score = 0;
localStorage.setItem('health_score', health_score)
localStorage.setItem('quiz_score', quiz_score)

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
                        window.location.assign(window.next_page);
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