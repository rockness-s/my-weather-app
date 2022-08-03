
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

function displayForecast (response) { 
    let forecast = response.data.daily;
    let forecastEl = document.querySelector("#forecast");
    let forecastHtml = `<div class="row">`;
    forecast.forEach(function(forecastDay) {

    forecastHtml = forecastHtml + 
    `<div class="col-2 forecast-date">
    <div>${forecastDay.dt}</div>
    <div>25/07</div>
  </div>

  <div class="col-2 forecast-sky">
  <span>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="80px"
  />
  </span>
  </div>

 <div class="col-3 forecast-temp">
    <div><i class="fa-solid fa-temperature-half"></i></div>
    <div><strong>${Math.round(forecastDay.temp.day)}</strong>/${Math.round(forecastDay.temp.night)}°C</div>
  </div>

  <div class="col-3 forecast-wind">
    <div><i class="fa-solid fa-wind"></i></div>
    <div>${Math.round(forecastDay.wind_speed * 3.6)} km/h</div>
  </div>

  <div class="col-2 forecast-hum">
    <div><i class="fa-solid fa-droplet"></i></div>
    <div>${forecastDay.humidity}%</div>
  </div>`;

})

  forecastHtml = forecastHtml + `</div>`;
  forecastEl.innerHTML = forecastHtml;
}


function getForecast(coord) {
    let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${units}`; 

    axios.get(apiUrl).then(displayForecast);
}


function showMainInfo(response) {
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

celsiusTemp = response.data.main.temp;
celsiusRealTemp = response.data.main.feels_like;

tempEl.innerHTML = Math.round(celsiusTemp);
tempRealEl.innerHTML = Math.round(celsiusRealTemp);
windEl.innerHTML = Math.round(response.data.wind.speed * 3.6);
humEl.innerHTML = (response.data.main.humidity);
sunriseEL.innerHTML = `${hoursRise} : ${minutesRise}`;
sunsetEL.innerHTML = `${hoursSet} : ${minutesSet}`;
timeEl.innerHTML = formatDate(response.data.dt * 1000);
dayEl.innerHTML = fullDate();
iconEl.setAttribute(
"src", 
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

getForecast(response.data.coord);
}


function search(city) {
    let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
    let link = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let apiUrlSearch = `${link}q=${city}&appid=${apiKey}&units=${units}`; 

    axios.get(apiUrlSearch).then(showMainInfo);
}

function handleSearch(event) {
    event.preventDefault();
    let inputEL = document.querySelector("#search-input");
    search(inputEL.value);
    let cityEl = document.querySelector("#city-upd");
    cityEl.innerHTML = `${inputEL.value}`;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempRealUnitEl = document.querySelector("#real-feel-unit");
    tempRealUnitEl.innerHTML = `°C`;
    inputEL.value = ``;
}

search("Kiev");
let cityEl = document.querySelector("#city-upd");
cityEl.innerHTML = `Kiev`;


let searchEl = document.querySelector("form");
searchEl.addEventListener("submit", handleSearch);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearch);




function showCurrentPlace(position) {
    let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
    let link = "https://api.openweathermap.org/data/2.5/weather?";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiUrl = `${link}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    function showCurrentInfo(response) {


        let cityName = response.data.name;
        let showCity = document.querySelector("h1");
        showCity.innerHTML = `${cityName}`;
        
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

        axios.get(apiUrl).then(showCurrentInfo);

 }

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentPlace);
  }

function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemp) * 9 / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTempEl = document.querySelector("#temp");
    fahrenheitTempEl.innerHTML = Math.round(fahrenheitTemp);
    let fahrenheitRealTemp = (celsiusRealTemp) * 9 / 5 + 32;
    let fahrenheitRealTempEl = document.querySelector("#real-feel");
    fahrenheitRealTempEl.innerHTML = Math.round(fahrenheitRealTemp);
    let tempRealUnitEl = document.querySelector("#real-feel-unit");
    tempRealUnitEl.innerHTML = `°F`;
}

function displayCelsius(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTempEl = document.querySelector("#temp");
    celsiusTempEl.innerHTML = Math.round(celsiusTemp);
    let celsiusRealTempEl = document.querySelector("#real-feel");
    celsiusRealTempEl.innerHTML = Math.round(celsiusRealTemp);
    let tempRealUnitEl = document.querySelector("#real-feel-unit");
    tempRealUnitEl.innerHTML = `°C`;
}

  let homeButton = document.querySelector("#home-button");
homeButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemp = null;
let celsiusRealTemp = null;


