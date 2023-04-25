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