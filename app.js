const ipGeoKey;
const ipGeoUrl;
const weatherKey;
const weatherUrl;

// HTML generating functions

function getFirstScreen() {
    // Initial screen loads with weather based on local conditions
}

function getDayForecastScreen() {
    // Html for day forecast screen
}

function getWeekForecastScreen() {
    // Html for week - 10 days screen
}

// API Functions

function formatQueryParams(params) {
    // Format query params, for API (may need 2 of these)
}

function displayResults() {
    // Display data from API (may need 2 of these)
}

function getWeather() {
    // Get weather based off location, submitted or from current location
}

function getLocation() {
    // Get location based off IP address or from submitted data
}

function watchForm() {
    // Watch form events and submission
}

function render() {
    // Render first screen?
}

function handleWeatherApp() {
    watchForm();
    render();
}

$(handleWeatherApp);