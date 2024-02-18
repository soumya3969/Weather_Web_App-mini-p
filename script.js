let data;
let lastLocation;

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

//* Function to save last searched location to local storage
const saveLastLocation = () => {
  localStorage.setItem('lastLocation', JSON.stringify(lastLocation));
};

//* Function to retrieve last searched location from local storage
const getLastLocation = () => {
  return JSON.parse(localStorage.getItem('lastLocation'));
};

//* Function to get weather data by city name
const getWeatherByCityName = async (city) => {
  //* Fetch details
  const fetchData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=2330b4cff9df477bb0a105928231102&q=${city}`
  );

  const orgData = await fetchData.json();
  data = orgData;
  console.log(data);

  // *Display the details
  countryName.innerHTML = data.location.country;
  stateName.innerHTML = data.location.region;
  cityName.innerHTML = data.location.name;
  humidity.innerHTML = data.current.humidity;
  windSpeed.innerHTML = data.current.wind_kph;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;
  temperature.innerHTML = data.current.temp_c;

  //* Set lastLocation
  lastLocation = { city: data.location.name, country: data.location.country };
  //* Save lastLocation to local storage
  saveLastLocation();
  // *for dynamic background change according to the weather.
  setBackgroundImage(data.current.condition.text);
};

//* Function to get current location
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

//* Function to get weather data by coordinates
const getWeatherByCoordinates = async (latitude, longitude) => {
  //* Fetch details
  const fetchData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=2330b4cff9df477bb0a105928231102&q=${latitude},${longitude}`
  );

  const orgData = await fetchData.json();
  data = orgData;
  console.log(data);

  //* Display the details
  countryName.innerHTML = data.location.country;
  stateName.innerHTML = data.location.region;
  cityName.innerHTML = data.location.name;
  humidity.innerHTML = data.current.humidity;
  windSpeed.innerHTML = data.current.wind_kph;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;
  temperature.innerHTML = data.current.temp_c;

  //* Set lastLocation
  lastLocation = { city: data.location.name, country: data.location.country };
  //* Save lastLocation to local storage
  saveLastLocation();
  //* change the background according to the location weather 
  setBackgroundImage(data.current.condition.text);
};

//* for dynamic background
const setBackgroundImage = (condition) => {
  let backgroundImage;
  switch (condition.toLowerCase()) {
    case 'clear':
      backgroundImage = 'clear.jpg';
      break;
    case 'windy':
      backgroundImage = 'windy.jpg';
      break;
    case 'sunny':
      backgroundImage = 'sunny.jpg';
      break;
    case 'rainy':
      backgroundImage = 'rainy.jpg';
      break;
    case 'cloudy':
      backgroundImage = 'cloudy.jpg';
      break;
    case 'partly cloudy':
      backgroundImage = 'partly_cloudy.jpg';
      break;
    case 'fog':
      backgroundImage = 'fog.jpg';
      break;
    case 'snow':
      backgroundImage = 'snow.jpg';
      break;
    case 'light snow':
      backgroundImage = 'snow.jpg';
      break;
    case 'thunderstorm':
      backgroundImage = 'thunderstorm.jpg';
      break;
    default:
      backgroundImage = 'default.jpg';
  }
  document.body.style.backgroundImage = `url('./assets/bgc/${backgroundImage}')`;
};

//* Load last searched location from local storage when page is loaded
window.onload = () => {
  lastLocation = getLastLocation();
  if (lastLocation) {
    inputBox.value = lastLocation.city;
    getWeatherByCityName(lastLocation.city);
  }
};

//* Add event listener to the button for getting current location
locationBtn.addEventListener("click", () => {
  getCurrentLocation();
});

//* Add event listener to the form for submitting city name
document.querySelector(".searchData").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = inputBox.value;
  getWeatherByCityName(city);
});
