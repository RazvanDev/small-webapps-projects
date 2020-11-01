const locale = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

let dateTable = document.querySelector(".date__table");
let yearElement = document.querySelector(".date__year__picker");
let monthElement = document.querySelector(".date__month__picker");

let month = new Date().getMonth();
let year = new Date().getFullYear();

yearElement.querySelector(".next__button").onclick = () => {
    let yearTextLabel = yearElement.querySelector("span");
    yearTextLabel.innerHTML = ++yearTextLabel.innerHTML; 
    generateDateCells();
};

yearElement.querySelector(".prev__button").onclick = () => {
    let yearTextLabel = yearElement.querySelector("span");
    yearTextLabel.innerHTML = --yearTextLabel.innerHTML; 
    generateDateCells();
};

monthElement.querySelector(".next__button").onclick = () => {
    let monthTextLabel = monthElement.querySelector("span");
    let monthNumber = getMonthFromString(monthTextLabel.innerHTML);
    monthNumber++;
    monthTextLabel.innerHTML = monthNames[monthNumber % 12]; 
    generateDateCells();
};

monthElement.querySelector(".prev__button").onclick = () => {
    let monthTextLabel = monthElement.querySelector("span");
    let monthNumber = getMonthFromString(monthTextLabel.innerHTML);
    monthNumber--;
    monthTextLabel.innerHTML = monthNames[monthNumber % 12]; 
    generateDateCells();
};


let generateDateCells = () => {
    month = getMonthFromString(monthElement.querySelector("span").innerHTML);
    year = yearElement.querySelector("span").innerHTML;
    let days = getDaysInMonth(month, year);
    let dayIndex = 0;

    for(let i = 1; i < dateTable.children.length; i++) {
        let row = dateTable.children[i];
        row.innerHTML = '';

        generateWeek(row);
        for (const wd of row.children) {
            if(dayIndex < days.length && wd.getAttribute("data-weekday") == days[dayIndex].getDay()) {
                wd.innerHTML = days[dayIndex].getDate();
                dayIndex++;
            }
        }
    }
}

let getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

let generateWeek = (row) => {
    for(let i = 1; i < 7; i++) {
        let weekDay = document.createElement("div");
        weekDay.classList.add("date__cell");
        weekDay.setAttribute("data-weekday", i);
        row.appendChild(weekDay);
    }

    let sundaykDay = document.createElement("div");
    sundaykDay.classList.add("date__cell");
    sundaykDay.setAttribute("data-weekday", 0);
    row.appendChild(sundaykDay);
}

let getMonthFromString = (mon) => {
    return new Date(Date.parse(mon +" 1, 1070")).getMonth()
 }

let init = () => {
    generateDateCells();
}

init();