var host = "cpsc484-03.yale.internal:8888";

var target = localStorage.getItem('target');

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
                    target = null;
                    document.getElementById('curs').style.visibility = 'hidden';
                }

            }
        }
    }
};
