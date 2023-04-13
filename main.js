// Server_Name = cpsc484-02.yale.internal
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");
// var socket = new WebSocket("ws://[Server_Name]:8888/frames");
var host = "cpsc484-01.yale.internal:8888";

$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        console.log(frame);
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