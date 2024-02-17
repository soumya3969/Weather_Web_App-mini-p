// *JavaScript code

let data;

const inputBox = document.getElementById("inputBox");
const locationBtn = document.getElementById("cur_loc");
const countryName = document.getElementById("countryName");
const stateName = document.getElementById("stateName");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const temperature = document.getElementById("temperature");
const logoImage = document.getElementById("logoImage");
const weatherStatus = document.getElementById("weatherStatus");

const getData = async (event) => {
  event.preventDefault();
  if (!inputBox.value) {
    // If the input is empty, get current location
    getCurrentLocation();
    return;
  }
  let city = inputBox.value;
  // Fetch details
  const fetchData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=2330b4cff9df477bb0a105928231102&q=${city}`
  );

  const orgData = await fetchData.json();
  data = orgData;
  console.log(data);

  // Display the details
  countryName.innerHTML = data.location.country;
  stateName.innerHTML = data.location.region;
  cityName.innerHTML = data.location.name;
  humidity.innerHTML = data.current.humidity;
  windSpeed.innerHTML = data.current.wind_kph;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;
  temperature.innerHTML = data.current.temp_c;

  // Set background image based on weather condition
  setBackgroundImage(data.current.condition.text);
};

// Function to get current location
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

// Function to get weather data by coordinates
const getWeatherByCoordinates = async (latitude, longitude) => {
  // Fetch details
  const fetchData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=2330b4cff9df477bb0a105928231102&q=${latitude},${longitude}`
  );

  const orgData = await fetchData.json();
  data = orgData;
  console.log(data);

  // Display the details
  countryName.innerHTML = data.location.country;
  stateName.innerHTML = data.location.region;
  cityName.innerHTML = data.location.name;
  humidity.innerHTML = data.current.humidity;
  windSpeed.innerHTML = data.current.wind_kph;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;
  temperature.innerHTML = data.current.temp_c;

  // Set background image based on weather condition
  setBackgroundImage(data.current.condition.text);
};

// Function to set background image based on weather condition
const setBackgroundImage = (condition) => {
  let backgroundImage;
  switch (condition.toLowerCase()) {
    case "clear":
      backgroundImage = "clear.jpg";
      break;
    case "windy":
      backgroundImage = "windy.jpg";
      break;
    case "sunny":
      backgroundImage = "sunny.jpg";
      break;
    case "rainy":
      backgroundImage = "rainy.jpg";
      break;
    case "cloudy":
      backgroundImage = "cloudy.jpg";
      break;
    case "partly cloudy":
      backgroundImage = "partly_cloudy.jpg";
      break;
    case "fog":
      backgroundImage = "fog.jpg";
      break;
    case "snow":
      backgroundImage = "snow.jpg";
      break;
    case "thunderstorm":
      backgroundImage = "thunderstorm.jpg";
      break;
    default:
      // Default background image
      backgroundImage = "default.jpg";
  }
  document.body.style.backgroundImage = `url('./assets/bgc/${backgroundImage}')`;
};

// Add event listener to the button for getting current location
locationBtn.addEventListener("click", () => {
  getCurrentLocation();
});

// Add event listener to the form for submitting city name
document.querySelector(".searchData").addEventListener("submit", getData);
