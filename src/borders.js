function addBorder(number) {
    let images = document.getElementsByTagName("img");
    for (let i = 0; i < 4; i++) {
        if (i == number){
            images[i].style.border = "3px solid black"
        }
        else {
            images[i].style.border = "3px solid white"
        }
    }
}

function removeBorder(number) {
    for (let i = 0; i < 4; i++) {
        let images = document.getElementsByTagName("img");
        images[i].style.border = "3px solid white"
    }
}
