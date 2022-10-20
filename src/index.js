//Search API

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "ab4754c503aea587f9201d84fcc00262";
  let input = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(ShowTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

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
  return `Last updated: ${day} ${hours} : ${minutes}`;
}

function ShowTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateNow");
  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = `with ${humidity} % humidity`;
  windElement.innerHTML = `and windspeed of ${wind} km/h`;
  descriptionElement.innerHTML = `${description} today`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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

//C to F

function convertionToFahrenheit(event) {
  event.preventDefault();
  let currentTempinC = 20;
  let shownTemperature = document.querySelector("#temperature");
  shownTemperature.innerHTML = (currentTempinC * 9) / 5 + 32;
}

function convertionToCelsius(event) {
  event.preventDefault();
  let currenTempinF = 68;
  let shownTemperature = document.querySelector("#temperature");
  shownTemperature.innerHTML = ((currenTempinF - 32) * 5) / 9;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertionToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertionToCelsius);
