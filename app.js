// IP Geolocation API url and key
const locationURL = 'https://geo.ipify.org/api/v1';
const locationKey = 'at_fELojdjZn4q2fyV7OJzuZSk6InEZK';

// Open Weather API url and key
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast';
const weatherKey = '3fa398fa8f3f496773abff4d988f09eb';

// Formats the apis query parameters
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// Gets current location based on IP address
function getPostalCode() {
    const key = 'apiKey' + '=' + locationKey;
    const url = locationURL + '?' + key;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => getWeather(responseJson.location.postalCode));
}

// Get weather zipcode
function getWeather(zipcode) {
    console.log(zipcode);

    const params = {
        appid: weatherKey,
        zip: zipcode,
        units: 'imperial'
    }    

    const queryString = formatQueryParams(params);
    const url = weatherURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCurrentWeather(responseJson));
}

// Get weather by City / State / Country
function getWeatherByCity(city) {
    const params = {
        appid: weatherKey,
        q: city,
        units: 'imperial'
    }

    const queryString = formatQueryParams(params);
    const url = weatherURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayCurrentWeather(responseJson));
}

// Get Forecast
function getForecast(city) {
    console.log('Ran');

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

// Display Forecast
function displayForecast(responseJson) {
    console.log(responseJson);

    $('#js-results').append(`
    <ul>
        <li>Test</li>
    </ul>`)
}

// Display current weather
function displayCurrentWeather(responseJson) {
    console.log(responseJson.main.feels_like)
    const temp = Math.round(responseJson.main.temp);
    const feelsLike = Math.round(responseJson.main.feels_like);
    const icon = responseJson.weather[0].icon;
    const conditions = responseJson.weather[0].description

    getCityName(responseJson.name);

    $('#js-results').append(
        `<h3>Here is your weather</h3>
        <ul>
            <li>${getWeatherIcon(icon, conditions)}</li>
            <li>Temperature: ${temp}&degF (Feels like: ${feelsLike}&degF)</li>
            <li>Humidity: ${responseJson.main.humidity}%</li>
        </ul>`
    )
}

// Return html for weather icon
function getWeatherIcon(icon, conditions) {
    console.log(icon);
    return `<img src='http://openweathermap.org/img/wn/${icon}.png' alt='${conditions}'`;
}

// Return Update / return city name to h1
function getCityName(city) {
    console.log(city);
    return $('#js-city-header').html(`Hello, ${city}`);
}

// Listen for submission button click to get input info
function handleFormSubmit() {
    $('#js-find-btn').on('click', function(event) {
        console.log('Clicked');
        event.preventDefault();
        $('#js-results').empty();
        const input = $('#js-search-city').val()
        // Test to see if integer, if so, getWeather(zipcode), else getWeatherByCity
        if (parseInt(input) == input) {
            getWeather(input);
        } else if (parseInt(input) !== input) {
            getWeatherByCity(input);
        }
    })
}

// Listen for get forecast button click to generate forecast html
function handleForecastBtn() {
    $('#js-forecast-btn').on('click', function(event) {
        console.log('Clicked');
        event.preventDefault();
        $('#js-results').empty();
        const getCity = $('#js-city-header').text()
        const city = getCity.replace('Hello, ',''); //Consider another way...
        console.log(city);

        getForecast(city);
    })
}



function handleWeatherApp() {
    getPostalCode();
    handleFormSubmit();
    handleForecastBtn();
}

$(handleWeatherApp);