function waitPageCountdown(startTime){
    const countdownEl = document.getElementById("countdown");
    let countdownValue = startTime;
    countdownEl.innerHTML = countdownValue;
      // start the countdown timer
    const countdownTimer = setInterval(function() {
        countdownValue--;
        countdownEl.innerHTML = countdownValue;
        if (countdownValue === 0) {
            clearInterval(countdownTimer);
            window.location.assign(window.next_page)
        }
    }, 1000);
}