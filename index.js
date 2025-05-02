const holidays = {
    "01-01": "🎉 New Year's Day",
    "03-08": "International Women's Day",
    "03-20": "Novruz",
    "03-21": "Novruz",
    "05-09": "Victory Day over Fascism",
    "05-28": "Republic Day",
    "06-15": "National Salvation Day of the Azerbaijani people",
    "06-26": "Day of Armed Forces of the Republic of Azerbaijan",
    "10-18": "Day of Restoration of Independence",
    "11-08": "Victory Day",
    "11-09": "National Flag Day of the Republic of Azerbaijan",
    "11-12": "Constitution Day",
    "11-17": "National Revival Day",
    "12-31": "World Azerbaijanis Solidarity Day;<br> <br>🎉 New Year's Eve!"
};
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
];
svgUpcoming = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="blue" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>'

const weekDays = document.getElementById("week-days");
const monthDates = document.getElementById("month-days");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = `${monthNames[month]} ${year}`;

    weekDays.innerHTML = "";
    for (let day of days) {
        weekDays.innerHTML += `<div>${day}</div>`;
    }

    monthDates.innerHTML = "";
    const firstday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();

    for (let i=0; i<firstday; i++){
        monthDates.innerHTML += "<div></div>";
    }

    for (let i=1; i<=daysInMonth; i++){
        monthDates.innerHTML += `<div class="week-date" >${i}</div>`;
    }

}

prevBtn.addEventListener("click", ()=> {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate); 
});

nextBtn.addEventListener("click", ()=> {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate); 
})

const calendarWrapper = document.getElementById("calendar-wrapper");
const calendar = document.getElementById("calendar");
const calendarHead = document.getElementById("head");

monthDates.addEventListener("click", (e)=>{
    if (e.target.textContent.trim() === "") return;

    calendarWrapper.classList.add("calendar-wrapper")
    calendar.classList.add("calendar");
    calendarHead.classList.add("head");
    weekDays.classList.add("week-days");
    monthDates.classList.add("month-days");

    const weekDay = document.getElementById("week-day");
    const dateCLicked = document.getElementById("date");
    const holiday = document.getElementById("holiday");
    const upcomingHeading = document.getElementById("heading");

    const clickedDay = parseInt(e.target.textContent);

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), clickedDay);
    const dayName = days[clickedDate.getDay()];
    const fullDate = `${clickedDay} ${monthNames[clickedDate.getMonth()]}, ${clickedDate.getFullYear()}`;

    const dayInfo = document.getElementById("day-info");
    dayInfo.style.display = "block";

    weekDay.textContent = dayName;
    dateCLicked.textContent = fullDate;
    
    const mm = String(clickedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(clickedDate.getDate()).padStart(2, "0");
    const key = `${mm}-${dd}`;
    
    if (holidays[key]) {
        holiday.innerHTML = holidays[key];
    } else {
        holiday.textContent = "";
    }
    
    upcomingHeading.textContent = "Upcoming";
})

document.addEventListener("click", (e) => {
    const dayInfo = document.getElementById("day-info");
    if (!dayInfo.contains(e.target) && !e.target.closest(".week-date")) {
        dayInfo.style.display = "none";

        calendarWrapper.classList.remove("calendar-wrapper")
        calendar.classList.remove("calendar");
        calendarHead.classList.remove("head");
        weekDays.classList.remove("week-days");
        monthDates.classList.remove("month-days");
    }
});

renderCalendar(currentDate);