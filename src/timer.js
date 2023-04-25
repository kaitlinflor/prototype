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

                    // If we are doing trivia, then go to either correct or incorrect and add
                    // approrpriate point to score
                    if (window.trivia == 1){
                        if (number == window.correct_number){
                            // Update Quiz Score
                            quiz_score = localStorage.getItem('quiz_score');
                            quiz_score = quiz_score + 1;
                            localStorage.setItem('quiz_score', quiz_score)

                            window.location.assign(window.correct);
                        }
                        else {
                            window.location.assign(window.incorrect);
                        }
                    }
                    else{
                        health_score = localStorage.getItem('health_score');
                        health_score = health_score + 1 + number;
                        localStorage.setItem('health_score', health_score)
                        window.location.assign(window.next_page);
                    }
                    // window.location.href = window.next_page;
                }, 3000);
                // }

            }
        }, 1000);
    }
}



// // Start Timer
// function startTimer(number) {
//     if (!timerInterval) {
//         timerInterval = setInterval(() => {
//             time--;
//             countdownTimer.innerHTML = `${time}`;
//             if (time === 0) {
//                 clearInterval(timerInterval);
//                 if (window.question == 1){
//                     document.getElementById("popup").style.display = "block";
//                     document.getElementById("popup").style.pointerEvents = "auto";

//                     const images = document.querySelectorAll(".chosen");
//                     images.forEach((image, i) => {
//                     if (i === number) {
//                         image.style.display = "block";
//                         } else {
//                             image.style.display = "none";
//                         }
//                         });
//                 }

//                 console.log("number = " + number);
//                 setTimeout(function() {
//                     console.log("CHANGING PAGES")
//                     console.log(window.next_page)
//                     window.location.assign(window.next_page);
//                     // window.location.href = window.next_page;
//                 }, 3000);
//                 // }

//             }
//         }, 1000);
//     }
// }


// Reset Timer
function resetTimer() {
    time = startingTime;
    countdownTimer.innerHTML = `${time}`;
    clearInterval(timerInterval);
    timerInterval = null;
}
