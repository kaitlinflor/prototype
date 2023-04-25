quiz_score = localStorage.getItem('quiz_score');
health_score = localStorage.getItem('health_score');

console.log(health_score)
console.log(quiz_score)

if (health_score >= 1 && health_score <= 8) {
    document.getElementById("advice").innerHTML = "You seem to be doing pretty well! Still, make a point of frequently checking in with friends or family for your own sake as well as theirs. It’s important to ask the people in your life how they’re doing, and to speak about your own feelings often too. Make sure that they feel seen and that they know they can always talk to you.";
}
else if (health_score >= 9 && health_score <= 18) {
    document.getElementById("advice").innerHTML = "It seems like you’re facing some mental health challenges in your life. Make sure to reach out to your support circle, or if you feel like you don’t have anyone to talk to, look to speak to a professional. No mental health issue is ever too small to address! Sometimes, just speaking about your problems and having someone to validate your feelings can make a big difference in your mindset and mood.";
    }
else if (health_score >= 19 && health_score <= 25) {
    document.getElementById("advice").innerHTML = "You might be going through a pretty hard time. Please reach out to your friends and family as well as a mental health professional, like a therapist or counselor, even if it may seem scary at first. It’s important to ask others for help, and no one will judge or condemn you for doing so. To the right, you’ll find the contact information for Yale Mental Health Care.";
}

waitPageCountdown(15, "../index.html")