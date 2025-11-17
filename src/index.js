function updateWeatherDetails(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = " " + response.data.condition.description;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + "mph";

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = `${formatDate(date)}`;

  let iconElement = document.querySelector("#icon-image");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}">`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours().toString().padStart(2, "0");
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7178db21973o74a8d48ft4f8cf3f740b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherDetails);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7178db21973o74a8d48ft4f8cf3f740b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>
<div>
<img src = "${day.condition.icon_url}" class= "weather-forecast-icon" /> 
</div>
<div class="weather-forecast-maxMin">
<div class="weather-temp-max">${Math.round(day.temperature.maximum)}</div>
<div class="weather-temp-min">${Math.round(day.temperature.minimum)}</div> 
</div>
</div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");

displayForecast("");
