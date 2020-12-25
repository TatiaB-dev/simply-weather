// IP Geolocation API url and key
const locationURL = 'https://geo.ipify.org/api/v1';
const locationKey = 'at_fELojdjZn4q2fyV7OJzuZSk6InEZK';

// Open Weather API url and key
const weatherURL = 'api.openweathermap.org/data/2.5/weather';
const weatherKey = '3fa398fa8f3f496773abff4d988f09eb';

// Formats the apis query parameters
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// Gets current location based on IP address
function getLocation() {
    const key = 'apiKey' + '=' + locationKey;
    const url = locationURL + '?' + key;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
}

// Get weather
function getWeather(location) {

}


$(getLocation);