let clockComponent = document.querySelector(".clock");
let calendarComponent = document.querySelector(".calendar");

let timeH = document.querySelector('.time__hours');
let timeM = document.querySelector(".time__minutes");

let countdownDays = document.querySelector('.countdown__days');
let countdownHours = document.querySelector('.countdown__hours');
let countdownMinutes = document.querySelector('.countdown__minutes');
let countdownSeconds = document.querySelector('.countdown__seconds');

let toggleModeBtn = document.querySelector(".inner__switch");

let clockFaceElapsed = document.querySelector(".clock__face__outline__circle__elapsed");
clockFaceElapsed.style.strokeDashArray = "360";

let originalSetDate = new Date('Oct 31, 2020 17:55:00') 
let finalDate = new Date('Oct 31, 2020 18:00:00');

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
    toggleMode();
}

toggleModeBtn.onclick = () => { toggleMode(); }

clockComponent.onclick = () => {
    toggleCalendarComponent();
}

let toggleCalendarComponent = () => {
    if(!calendarComponent.classList.contains("hide") && !calendarComponent.classList.contains("show")) {
        calendarComponent.classList.add("show");
        clockComponent.classList.add("calendar__active");
    } else {
        if (calendarComponent.classList.contains("show")) {
            calendarComponent.classList.remove("show");
            calendarComponent.classList.add("hide");
            clockComponent.classList.remove("calendar__active");
        } else {
            calendarComponent.classList.remove("hide");
            calendarComponent.classList.add("show");
            clockComponent.classList.add("calendar__active");
        }
    }  
}

let toggleMode = () => {
    let bodyElement = document.querySelector('body');
    
    if(bodyElement.classList.contains('dark')) {
        bodyElement.classList.remove('dark');
        toggleModeBtn.textContent = "OFF";
        bodyElement.classList.add('light');
        clockFaceElapsed.classList.add("blue");
        clockFaceElapsed.classList.remove("red");
    } else {
        bodyElement.classList.remove('light');
        toggleModeBtn.textContent = "ON";
        bodyElement.classList.add('dark');
        clockFaceElapsed.classList.add("red");
        clockFaceElapsed.classList.remove("blue");
    }
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