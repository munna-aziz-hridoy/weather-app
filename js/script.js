// getting all the dom
const toggleBtn = document.getElementById("toggle-btn");
const searchCity = document.getElementById("search-city");
const arrowBtn = document.getElementById("arrow-btn");
const cityInput = document.getElementById("search-city-input");
const searchBtn = document.getElementById("search-btn");
const cityList = document.getElementById("city-list");
const city = document.getElementById("city");
const country = document.getElementById("country");
const weatherText = document.getElementById("weather-text");
const weatherTemp = document.getElementById("weather-temp");
const weatherImg = document.getElementById("weather-img");
const weatherTempFar = document.getElementById("temp-in-far");
const windText = document.getElementById("wind-speed");

// functions

const getCurrentCity = (cities, inputValue) => {
  cityList.textContent = "";

  cities.forEach((cityObj) => {
    let cityName = cityObj.city;
    if (cityName.toLowerCase().startsWith(inputValue.toLowerCase())) {
      const li = document.createElement("li");
      li.classList.add("search-list-item");
      li.innerText = cityName;
      cityList.appendChild(li);
    }
  });
  if (inputValue == "") {
    cityList.textContent = "";
  }
};

const loadWeather = (city = "dhaka") => {
  const api = `https://api.weatherapi.com/v1/current.json?key=6aa1712ae73e42ee98c104058222402&q=${city}&aqi=no`;

  fetch(api)
    .then((res) => res.json())
    .then((data) => showWeather(data));
};

const showWeather = (data) => {
  weatherTemp.innerText = data.current.temp_c;
  city.innerText = data.location.name;
  country.innerText = data.location.country;
  weatherText.innerText = data.current.condition.text;
  weatherImg.innerHTML = `<img src=${data.current.condition.icon}>`;
  weatherTempFar.innerText = data.current.temp_f;
  windText.innerText = data.current.wind_kph;
};

loadWeather();

toggleBtn.addEventListener("click", () => {
  searchCity.style.right = "0";
});

arrowBtn.addEventListener("click", () => {
  searchCity.style.right = "-325px";
});

cityInput.addEventListener("keyup", (e) => {
  let userValue = e.target.value;

  fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
    .then((res) => res.json())
    .then((data) => getCurrentCity(data.data, userValue));
});

searchBtn.addEventListener("click", () => {
  searchCity.style.right = "-325px";
  let searchtext = cityInput.value;
  cityInput.value = "";
  loadWeather(searchtext);
});

cityList.addEventListener("click", (e) => {
  let userClicked = e.target.innerText;
  cityInput.value = userClicked;
  cityList.textContent = "";
});

