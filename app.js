// GLOBAL VARIABLES - API URLs and Keys // 

    // IP Geolocation API url and key
const ipGeoLocateURL = 'https://geo.ipify.org/api/v1';
const ipGeoLocateKey = 'at_fELojdjZn4q2fyV7OJzuZSk6InEZK';

    // Open Weather API url and key
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast';
const weatherKey = '3fa398fa8f3f496773abff4d988f09eb';

// General Formatting Functions //

    // Formats the query parameters for all api requests
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

    // Formats date and time from unix timestamp to more legible date and time
function getDate(unixTime) {
    let date = new Date(unixTime * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amOrPM = 'am';

    if (hour >= 12) {
        amOrPM = 'pm';
    }

    hour = (hour % 12) || 12;

    let finalTime = hour + ':' + minutes + 0 + amOrPM
    let finalDate = month + '.' + day + '.' + year

    return finalDate + ' ' + finalTime;
}

    // Return html for weather icon
function getWeatherIcon(icon, conditions) {
    return `<img src='http://openweathermap.org/img/wn/${icon}.png' alt='${conditions}'>`;
}

    // Updates the header on the screen with the user's current city or the city searched for
function getCityName(city) {
    return $('#js-city-header').html(`Hello, ${city}`);
}

function getMiles(meters) {
    return (meters * 0.000621371192).toFixed(1) + 'mi';
}

// Fetch IP Geolocation API Request Functions //

    // Gets the urser's current location based on their IP address
function getPostalCode() {
    const key = 'apiKey' + '=' + ipGeoLocateKey;
    const url = ipGeoLocateURL + '?' + key;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => getWeather(responseJson.location.postalCode));
}

// Fetch Weather API Request Functions //

    // API request to get current weather based on user's zipcode
function getWeather(zipcode) {

    const params = {
        appid: weatherKey,
        zip: zipcode,
        units: 'imperial'
    }    

    const queryString = formatQueryParams(params);
    const url = currentWeatherURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCurrentWeather(responseJson));
}

function getWeatherByCity(city) {
    const params = {
        appid: weatherKey,
        q: city,
        units: 'imperial'
    }

    const queryString = formatQueryParams(params);
    const url = currentWeatherURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCurrentWeather(responseJson));
}

function getForecast(city) {

    const params = {
        appid: weatherKey,
        q: city,
        units: 'imperial'
    }    

    const queryString = formatQueryParams(params);
    const url = forecastURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayForecast(responseJson));
}

// Displaying functions for each screen the user sees // 

function displayForecast(responseJson) {

    for (let i = 0; i < responseJson.list.length; i += 2) {
        const date = getDate(responseJson.list[i].dt)
        const icon = responseJson.list[i].weather[0].icon;
        const conditions = responseJson.list[i].weather[0].description;
        
        $('#js-results').append(`
        <ul>
            <li><h3>${date}</h3></li>
            <li>${getWeatherIcon(icon, conditions)}</li>
            <li>Take a look at the ${conditions}</li>
            <li>${responseJson.list[i].main.temp}&degF</li>
            <li>${responseJson.list[i].main.feels_like}&degF</li>
            <li>${responseJson.list[i].main.humidity}%</li>
        </ul>`)
    }
}

function displayCurrentWeather(responseJson) {

    const temp = Math.round(responseJson.main.temp);
    const feelsLike = Math.round(responseJson.main.feels_like);
    const icon = responseJson.weather[0].icon;
    const conditions = responseJson.weather[0].description;
    const miles = getMiles(responseJson.visibility)
    let sunset = getDate(responseJson.sys.sunset);
    let sunrise = getDate(responseJson.sys.sunrise);
    sunrise = sunrise.slice(10);
    sunset = sunset.slice(10);

    getCityName(responseJson.name);

    $('#js-results').append(
        `<h3>The weather right now is... </h3>
        <container>
            <section class='main-weather'>
                <div>${getWeatherIcon(icon, conditions)}</div>
                <div><h3 class='temp'>${temp}&degF</h3></div>
                <div><p class='feels-like'>(Feels like ${feelsLike}&degF)</p></div>
            </section>
            <section class='weather-details'>
                <ul class='weather-list'>
                    <li>Humidity: ${responseJson.main.humidity}%</li>
                    <li>Sunrise: ${sunrise}</li>
                    <li>Sunset: ${sunset}</li>
                    <li>Visibility: ${miles}</li>
                </ul>
            </section>
        </container>`
    )
}

// Button Click, User Interaction Functions //

function handleFormSubmit() {

    $('#js-find-btn').on('click', function(event) {
        event.preventDefault();
        $('#js-results').empty();
        const input = $('#js-search-city').val()

        if (parseInt(input) == input) { // This tests to see if integer, if so, getWeather(zipcode), else getWeatherByCity
            getWeather(input);
        } else if (parseInt(input) !== input) {
            getWeatherByCity(input);
        }
    })
}

function handleForecastBtn() {
    $('#js-forecast-btn').on('click', function(event) {
        event.preventDefault();
        $('#js-results').empty();
        const getCity = $('#js-city-header').text()
        const city = getCity.replace('Hello, ',''); //Consider another way...??

        getForecast(city);
    })
}



function handleWeatherApp() {
    getPostalCode();
    handleFormSubmit();
    handleForecastBtn();
}

$(handleWeatherApp);