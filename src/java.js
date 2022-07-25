
function formatDate(timestamp) {
    let dateUpd = new Date(timestamp);
    let hoursUpd = String(dateUpd.getHours()).padStart(2, "0");
    let minutesUpd = String(dateUpd.getMinutes()).padStart(2, "0");
    let day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let dayUpd = day[dateUpd.getDay()];

    return `${dayUpd} ${hoursUpd} : ${minutesUpd}`
}

//

function showMainInfo(response) {

console.log(response)

let tempEl = document.querySelector("#temp");
let tempRealEl = document.querySelector("#real-feel");
let windEl = document.querySelector("#details-wind");
let humEl = document.querySelector("#details-hum");
let dateEl = document.querySelector("#last-upd");

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

tempEl.innerHTML = Math.round(response.data.main.temp);
tempRealEl.innerHTML = Math.round(response.data.main.feels_like);
windEl.innerHTML = Math.round(response.data.wind.speed * 3.6);
humEl.innerHTML = (response.data.main.humidity);
sunriseEL.innerHTML = `${hoursRise} : ${minutesRise}`;
sunsetEL.innerHTML = `${hoursSet} : ${minutesSet}`;
dateEl.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
let city = "Barcelona";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showMainInfo);

