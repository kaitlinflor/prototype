function getHandPos(frame, target) {

    command = null;

    document.getElementById('curs').style.visibility = 'visible';

    var person = is_present(frame, target);
    var right_hand_x = frame.people[person].joints[15].pixel.x;
    var right_hand_y = frame.people[person].joints[15].pixel.y;

    var top_pos = right_hand_y / 720  * 100;
    var right_pos = right_hand_x / 1280 * 100;

    document.getElementById('t').style.top = top_pos.toString().concat("%");
    document.getElementById('t2').style.top = (top_pos + .6).toString().concat("%");
    document.getElementById('t3').style.top = (top_pos + .6).toString().concat("%");

    document.getElementById('t').style.right = right_pos.toString().concat("%");
    document.getElementById('t2').style.right = (right_pos + .29).toString().concat("%");
    document.getElementById('t3').style.right = (right_pos - .45).toString().concat("%");

    var curs_pos = document.getElementById('t').getBoundingClientRect();
    var cx = curs_pos.left + curs_pos.width * 0.5;    // find center of first image
    var cy = curs_pos.top + curs_pos.height * 0.5;

    const buttons = document.querySelectorAll(".selector");

    // console.log("X : " + cx)
    // console.log("Y : " + cy)

    for (let i = 0; i < buttons.length; i++) {
        // console.log(i)

        const button = buttons[i];
        const rect = button.getBoundingClientRect();

        // console.log("LEFT : " + rect.left + " RIGHT : " + rect.right)
        // console.log("BOTTOM : " + rect.bottom + " TOP : " + rect.top)

        // check if the cursor is within the bounding box of the image
        if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
            command = i;
            break;
            // console.log(command);
        }
        // console.log("COMMAND : " + command)

    }
    if (command == null) {
        command = null;
        resetTimer();
        removeColor();
    }
    return command;
}

function sendHandCommand(command) {
    switch (command) {
    case 0:
        startTimer(0)
        changeColor(0)
        break;
    case 1:
        startTimer(1)
        changeColor(1)
        break;
    case 2:
        startTimer(2)
        changeColor(2)
        break;
    case 3:
        changeColor(3)
        startTimer(3)
        break;
    case 4:
        changeColor(4)
        startTimer(4)
        break;
    }
}