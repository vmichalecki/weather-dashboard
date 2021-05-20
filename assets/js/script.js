// global variables
let key = '41fb0d420da1aa1f169bc441322e7bd5';
let citySearch = document.querySelector('.city-search');
let cityName = document.querySelector('.city-name');
let date = document.querySelector('.date');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let uvIndex = document.querySelector('.uv-index');


// functions
// init
// check local storage for the key (cities)
// if present, dynamically create buttons with then button label as the city

// getWeather
// param: value of search box (city name)
// call API with city name to get the coordinates lat and lon
// find the lat and lon within the data and set them as variables
// in the then of the call above, use the lat and lon to get current
// in the then of the call
// for five-day foreacst, loop through array of daily data

// save the city the user searched to local storage, but check local storage for that city first, don't add if already there

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f')
        .then(response => response.json())
        .then(data => {
            let nameValue = data['name'];
            let dateValue = new Date(data.dt * 1000);
            let options = { date };
            let tempValue = data['main']['temp'];
            let windValue = data['wind']['speed'];
            let humidityValue = data['main']['humidity'];
            console.log(nameValue);
            console.log(dateValue);
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            getUVI(lat, lon);
            getFiveDay(nameValue);
            cityName.innerHTML = nameValue;
            date.innerHTML = new Intl.DateTimeFormat('en-US', options).format(dateValue);
            temp.innerHTML = tempValue;
            wind.innerHTML = windValue;
            humidity.innerHTML = humidityValue;
        })

};

function getUVI(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,daily,alerts&appid=2acf688360ef2e4ae9e0ba6153c2285f')
        .then(response => response.json())
        .then(data => {
            let uviValue = data['current']['uvi'];
            uvIndex.innerHTML = uviValue;
        })
}

function getFiveDay(nameValue) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=chicago&appid=2acf688360ef2e4ae9e0ba6153c2285f&cnt=5')
        .then(response => response.json())
        .then(data => {
            data.list.forEach((lists, index) => {
                console.log(lists);
            })
        })
};


getWeather();

// events
// init (check local storage)
// search button to call the API and get the cream filling
// click on past city button to regenerate the forecast again (call the getWeather function with the label of button)