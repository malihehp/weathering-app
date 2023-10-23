let date = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let formattedDate = `${currentDay}`;
  return formattedDate;
}
console.log(formatDate(date));
document.getElementById("current-time").innerHTML = formatDate(date);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity ${response.data.main.humidity}%`;
}

function search(city) {
  let apiKey = "7d19e202d7bd4d388ee455df3c1e148f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitEvent(event) {
  event.preventDefault();
  let city = document.querySelector("#currentCity").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "7d19e202d7bd4d388ee455df3c1e148f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#image");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", submitEvent);

search("paris");
