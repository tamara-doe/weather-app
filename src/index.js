function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="forecast-date">${day}</div>
      <img
        src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
        alt=""
        width="36"
      />
      <div class="forecast-temperature">
        <span class="forecast-temperature-max">18°</span>
        <span class="forecast-temperature-min">5°</span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function ShowTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateNow");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = celsiusTemperature;
  humidityElement.innerHTML = `with ${response.data.main.humidity} % humidity`;
  windElement.innerHTML = `and windspeed of ${Math.round(
    response.data.wind.speed
  )} km/h`;
  descriptionElement.innerHTML = `${response.data.weather[0].description} today`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ab4754c503aea587f9201d84fcc00262";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(ShowTemperature);
}

function handlesubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab4754c503aea587f9201d84fcc00262";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(ShowTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentPosition);

function displayFahrenheit(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

displayForecast();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

search("Berlin");
