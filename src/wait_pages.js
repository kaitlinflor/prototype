function waitPageCountdown(startTime, page){
    const countdownEl = document.getElementById("countdown");
    let countdownValue = startTime;
    countdownEl.innerHTML = countdownValue;
    // start the countdown timer
    const countdownTimer = setInterval(function() {
        countdownValue--;
        countdownEl.innerHTML = countdownValue;
        if (countdownValue === 0) {
            clearInterval(countdownTimer);
            window.location.assign(page)
        }
    }, 1000);
}


function waitPageCountdown2(startTime, page){
    let countdownValue = startTime;
    // start the countdown timer
    const countdownTimer = setInterval(function() {
        countdownValue--;
        if (countdownValue === 0) {
            clearInterval(countdownTimer);
            window.location.assign(page)
        }
    }, 1000);
}

