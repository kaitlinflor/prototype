function detect_target (frame) {
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


function is_present(frame, target) {

    for (let i = 0; i < frame.people.length; i++){

        if (frame.people[i].body_id == target){

            return i;
        }
    }

    return null;
}

function showWarning() {
    var warning = document.getElementById("warning");
    warning.display = "block";
}