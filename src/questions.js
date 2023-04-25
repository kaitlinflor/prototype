var host = "cpsc484-03.yale.internal:8888";

var target = localStorage.getItem('target');
var stop = 0;

health_score = localStorage.getItem('health_score');
quiz_score = localStorage.getItem('quiz_score');

console.log("Health score : " + health_score)
console.log("Quiz score :" + quiz_score)

$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            // frames.show(JSON.parse(event.data));
        if (stop == 0){
            if(target == null){
                target = detect_target(JSON.parse(event.data));
                console.log("Checking");
            }

            if (target !== null) {

                if(is_present(JSON.parse(event.data), target) != null){
                    command = getHandPos(JSON.parse(event.data), target);
                    sendHandCommand(command);
                }
                else {
                    frames.stop()
                    document.getElementById('curs').style.visibility = 'hidden';
                }

            }
        }
        }   
    },
    stop: function(){
        stop = 1;
        var warning = document.getElementById("warning");
        warning.style.display = "block";
        waitPageCountdown(3, '../index.html');
        document.getElementById('curs').style.visibility = 'hidden';
    }
};


function goNextPage(number){
    // If we are doing trivia, then go to either correct or incorrect and add
    // approrpriate point to score
    if (window.trivia == 1){
        if (number == window.number){
            // Update Quiz Score
            quiz_score = localStorage.getItem('quiz_score');
            quiz_score = +quiz_score + 1;
            localStorage.setItem('quiz_score', quiz_score)

            window.location.assign(window.correct);
        }
        else {
            window.location.assign(window.incorrect);
        }
    }
    else{
        health_score = localStorage.getItem('health_score');
        health_score = +health_score + 1 + +number;
        console.log(health_score)
        localStorage.setItem('health_score', health_score)
        window.location.assign(window.next_page);
    }
}