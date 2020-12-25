// IP Geolocation API url and key
const locationURL = 'https://geo.ipify.org/api/v1';
const locationKey = 'at_fELojdjZn4q2fyV7OJzuZSk6InEZK';

// Open Weather API url and key
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
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

// Get weather
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

// Display current weather
function displayCurrentWeather(responseJson) {
    console.log(responseJson.main.feels_like)
    const temp = Math.round(responseJson.main.temp);
    const feelsLike = Math.round(responseJson.main.feels_like);
    const icon = responseJson.weather[0].icon;
    const conditions = responseJson.weather[0].description
    

    $('#js-results').append(
        `<h3>Here is your weather</h3>
        <ul>
            <li>${getWeatherIcon(icon, conditions)}</li>
            <li>Temperature: ${temp}&degF (Feels like: ${feelsLike}&degF)</li>
            <li>Humidity: ${responseJson.main.humidity}%</li>
        </ul>`
    )
}

function getWeatherIcon(icon, conditions) {
    console.log(icon);
    return `<img src='http://openweathermap.org/img/wn/${icon}.png' alt='${conditions}'`;
}

$(getPostalCode);