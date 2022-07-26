
function formatDate(timestamp) {
    let timeUpd = new Date(timestamp);
    let hoursUpd = String(timeUpd.getHours()).padStart(2, "0");
    let minutesUpd = String(timeUpd.getMinutes()).padStart(2, "0");
    let day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let dayFull = day[timeUpd.getDay()];

    return `${dayFull} ${hoursUpd} : ${minutesUpd}`
}

function fullDate () {
    let dateNow = new Date ();
    let date = dateNow.getDate();
    let month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let monthFull = month[dateNow.getMonth()];
    let year = dateNow.getFullYear();

    return `${date} ${monthFull} ${year}`
}

function showMainInfo(response) {
console.log(response)

let cityEl = document.querySelector("#city-upd");
let tempEl = document.querySelector("#temp");
let tempRealEl = document.querySelector("#real-feel");
let windEl = document.querySelector("#details-wind");
let humEl = document.querySelector("#details-hum");
let timeEl = document.querySelector("#time-upd");
let dayEl = document.querySelector("#date-upd");
let iconEl = document.querySelector("#current-icon");

let sunriseTime = Math.round(response.data.sys.sunrise);
let dateRise = new Date(sunriseTime * 1000);
let hoursRise = String(dateRise.getHours()).padStart(2, "0");
let minutesRise = String(dateRise.getMinutes()).padStart(2, "0");
let sunriseEL = document.querySelector("#details-sunrise");

let sunsetTime = Math.round(response.data.sys.sunset);
let dateSet = new Date(sunsetTime * 1000);
let hoursSet = String(dateSet.getHours()).padStart(2, "0");
let minutesSet = String(dateSet.getMinutes()).padStart(2, "0");
let sunsetEL = document.querySelector("#details-sunset");

cityEl.innerHTML = `${city}`;
tempEl.innerHTML = Math.round(response.data.main.temp);
tempRealEl.innerHTML = Math.round(response.data.main.feels_like);
windEl.innerHTML = Math.round(response.data.wind.speed * 3.6);
humEl.innerHTML = (response.data.main.humidity);
sunriseEL.innerHTML = `${hoursRise} : ${minutesRise}`;
sunsetEL.innerHTML = `${hoursSet} : ${minutesSet}`;
timeEl.innerHTML = formatDate(response.data.dt * 1000);
dayEl.innerHTML = fullDate();
iconEl.setAttribute(
"src", 
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)


}

let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
let city = "Lisbon";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showMainInfo);

