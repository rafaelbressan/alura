const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekend = daysOfTheWeek.slice(-2);
const weekday = daysOfTheWeek.slice(0, 4);
let dayOfTheWeek;
const weekdayGreeting = "Have a great week!"
const weekendGreeting = "Have a great weekend!"

document.addEventListener('DOMContentLoaded', () => {

    alert("Welcome!")
    function checkWeekdays(day) {
        if (weekend.includes(day)) {
            alert(weekendGreeting);
        } else if (weekday.includes(day)) {
            alert(weekdayGreeting)
        } else {
            alert("Not a valid day, choose between these dates:\n" + daysOfTheWeek.join(", "))
        }
    }
    if (!dayOfTheWeek) {
        let greetings = prompt("What day is it?");
        dayOfTheWeek = greetings;
        checkWeekdays(`${dayOfTheWeek}`);
    }
});

function refreshPage() {
    location.reload();
}