let now = new Date();
console.log(now.getDate());
console.log(now.getMilliseconds());
console.log(now.getDay());
console.log(now.getFullYear());
console.log(now.getMonth());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsnesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = [now.getFullYear()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hours = now.getHours();
let minutes = now.getMinutes();
let month = months[now.getMonth()];
let h1 = document.querySelector("h1");
h1.innerHTML = `${month} ${day}, ${year} ${hours}:${minutes}`;
if (minutes < 10) {
  h1.innterHTML = `${month} ${day}, ${year} ${hours}:0${minutes}`;
}
if (hours < 10) {
  h1.innerHTML = `${month} ${day}, ${year} 0${hours}:${minutes}`;
}

//city search

function search(city) {
  let apiKey = "4d2a567c086d07d567943ed0f435616c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  console.log(city);
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//temperature conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

//current location
function showMyLocation(response) {
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.name;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = temperature;
  // description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  // rain
  let pressure = Math.round(response.data.main.pressure);
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = pressure;

  celsiusTemperature = response.data.main.temp;
  // humidity
  let humidity = Math.round(response.data.main.humidity);
  let humidChance = document.querySelector("#humidity");
  humidChance.innerHTML = humidity;
  // wind
  let wind = Math.round(response.data.wind.speed);
  let speed = document.querySelector("#wind");
  speed.innerHTML = wind;
  // icon
  let iconElement = document.querySelector("#icon");
  console.log(iconElement);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDefault.setAttribute("alt", response.data.weather[0].icon);
}

function getPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "4d2a567c086d07d567943ed0f435616c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showMyLocation);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", getLocation);

search("San Francisco");
