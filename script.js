const searchInput = document.querySelector('.search-input');
const weatherIcon = document.querySelector('.weather-icon');
// const locationButton = document.querySelector('.location-button');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const hourlyWeatherList = document.querySelector('.weather-list');
const weatherLocation = document.querySelector('.location');
const API_KEY = "fdd1489a689e4046899142559242908";

/* weather codes mapping to custom icons */

const weatherCodes = {
    clear:[1000],
    Clouds:[1003, 1006, 1009],
    mist: [1030, 1135, 1147],
    rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
    moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
    snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
    thunder: [1087, 1279, 1282],
    thunder_rain: [1273, 1276]
}

// 
const displayHourlyForecast = (displayHourlyForecast)=>{
    displayHourlyForecast.forEach(element => {
        const weatherIcons = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(element.condition.code));
        const temp = Math.floor(element.temp_c);
        hourlyWeatherList.innerHTML += `
        <li class="weather-item">
            <p class="time">${element.time.split(" ")[1].substring(0, 5)}</p>
            <img src = icons/${weatherIcons}.svg class="weather-icon">
            <p class="temperature">${temp}<span>°</span></p>
        </li>`
    });
    
}

const getWeatherDetails = async (cityName)=>{
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`;
    try{
        const response = await fetch(API_URL);
        //main object data
        const data = await response.json();
        // code for custom weather icons
        const weatherIcons = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));
        // cobined hould data
        const combinedHourlyData = [...data.forecast.forecastday[0].hour];
        displayHourlyForecast(combinedHourlyData);
        //set weather icon
        weatherIcon.src = `icons/${weatherIcons}.svg`
        //set temperature
        const temp = Math.floor(data.current.temp_c);
        temperature.innerHTML = `${temp}<span>°C</span>`;
        //set description
        description.innerHTML = `${data.current.condition.text}`;
        //set location 
        weatherLocation.innerHTML = `${data.location.name}`;
    }catch(error){
        console.log(error);
        weatherIcon.src = "icons/no-result.svg";
        temperature.innerHTML = `0<span>°C</span>`;
        description.innerHTML = "Not Found";
    }
}

searchInput.addEventListener('keyup',(e)=>{
    const cityName = searchInput.value.trim();

    if(e.key == "Enter" && cityName){
        getWeatherDetails(cityName);
    }
})

getWeatherDetails("Delhi");


