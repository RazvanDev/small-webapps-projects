let timeH = document.querySelector('.time__hours');
let timeM = document.querySelector(".time__minutes");

let countdownDays = document.querySelector('.countdown__days');
let countdownHours = document.querySelector('.countdown__hours');
let countdownMinutes = document.querySelector('.countdown__minutes');
let countdownSeconds = document.querySelector('.countdown__seconds');

let clockFaceElapsed = document.querySelector(".clock__face__outline__circle__elapsed.red");
clockFaceElapsed.style.strokeDashArray = "360";
let originalSetDate = new Date('Oct 16, 2020 19:05:00') 
let finalDate = new Date('Oct 15, 2020 19:10:00');

let date = document.querySelector(".date__text");

let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;

let startApp = () => {
    updateTime();
    updateDate();
    updateCountdown();
    setInterval(() => {
        updateTime();
        updateDate();
        updateCountdown();
    }, 1000);
}

let updateTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    timeH.textContent = formatDHMS(hours);
    timeM.textContent = formatDHMS(minutes);
}

let updateDate = () => {
    dateFormat = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    date.textContent = dateFormat.format(); 
}

let updateCountdown = () => {
    let now = new Date();
    let diff = finalDate - now;
    
    if(diff > 0) {
        let newOffset = (diff / (finalDate - originalSetDate) * 100);
        clockFaceElapsed.style.strokeDashoffset = -((Math.round(newOffset))/100)*360;

        let countdownData = convertMillisToDHMS(diff);
        countdownDays.textContent = formatDHMS(countdownData.days);
        countdownHours.textContent = formatDHMS(countdownData.hours);
        countdownMinutes.textContent = formatDHMS(countdownData.minutes);
        countdownSeconds.textContent = formatDHMS(countdownData.seconds);    
    }
}
let convertMillisToDHMS = (millis) => {
    let days = Math.floor(millis / day);
    let hours = Math.floor((millis % day) / hour);
    let minutes = Math.floor((millis % hour) / minute);
    let seconds = Math.floor((millis % minute) / second);
    return {days, hours, minutes, seconds};
}

let formatDHMS = (value) => {
    return value >= 10 ? value : '0' + value;
}

startApp();