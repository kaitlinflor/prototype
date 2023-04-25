let timerInterval = null;
const startingTime = 3;
let time = startingTime;
const countdownTimer = document.getElementById("timer");
const image_num = 0;

// Start Timer
function startTimer(number) {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            time--;
            countdownTimer.innerHTML = `${time}`;
            if (time === 0) {
                clearInterval(timerInterval);
                if (window.question == 1){
                    document.getElementById("popup").style.display = "block";
                    document.getElementById("popup").style.pointerEvents = "auto";

                    const images = document.querySelectorAll(".chosen");
                    images.forEach((image, i) => {
                    if (i === number) {
                        image.style.display = "block";
                        } else {
                            image.style.display = "none";
                        }
                        });
                }

                console.log("number = " + number);
                setTimeout(function() {
                    console.log("CHANGING PAGES")
                    console.log(window.next_page)
                    if (window.trivia == 1){
                        if (number == window.number){
                            window.location.assign(window.correct);
                        }
                        else {
                            window.location.assign(window.incorrect);
                        }
                    }
                    else{
                        window.location.assign(window.next_page);
                    }
                    // window.location.href = window.next_page;
                }, 3000);
                // }

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
