// global variables
// API key
// city
// wind
// humidity
// UV index, set class

let key = '41fb0d420da1aa1f169bc441322e7bd5';









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
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f')
        .then(response => response.json())
        .then(data => {



        })
};

function getSevenDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=2acf688360ef2e4ae9e0ba6153c2285f`)
        .then(response => response.json())
        .then(data => {


        })
};




// events
// init (check local storage)
// search button to call the API and get the cream filling
// click on past city button to regenerate the forecast again (call the getWeather function with the label of button)