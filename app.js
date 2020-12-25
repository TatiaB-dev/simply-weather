const ipURL = 'https://api.ipify.org?format=json';

function getIPAddress() {
    fetch(ipURL) 
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
}