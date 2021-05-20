// global variables
let key = '41fb0d420da1aa1f169bc441322e7bd5';
let citySearch = document.querySelector('.city-search');
let cityName = document.querySelector('.city-name');
let date = document.querySelector('.date');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let uvIndex = document.querySelector('.uv-index');
let forecastContainer = document.querySelector('.forecast-container');


// functions
// init
// check local storage for the key (cities)
// if present, dynamically create buttons with then button label as the city
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
            forecastContainer.innerHTML = "";
            data.list.forEach((lists, index) => {
                if (index === 0) {
                    return;
                };
                console.log(lists);
                let forecastDate = new Date(lists.dt * 1000);
                let options = { date };
                let forecastIcon = lists.weather[0].icon;
                let forecastTemp = lists.main.temp;
                let forecastWind = lists.wind.speed;
                let forecastHumidity = lists.main.humidity;
                let forecastCard = document.createElement('div');
                let cardDate = document.createElement('h3');
                let cardIcon = document.createElement('p');
                let cardTemp = document.createElement('p');
                let cardWind = document.createElement('p');
                let cardHumidity = document.createElement('p');
                forecastContainer.append(forecastCard);
                forecastCard.append(cardDate);
                forecastCard.append(cardIcon);
                forecastCard.append(cardTemp);
                forecastCard.append(cardWind);
                forecastCard.append(cardHumidity);
                cardDate.innerHTML = new Intl.DateTimeFormat('en-US', options).format(forecastDate);
                cardIcon.innerHTML = forecastIcon;
                cardTemp.innerHTML = forecastTemp;
                cardWind.innerHTML = forecastWind;
                cardHumidity.innerHTML = forecastHumidity;
                console.log(forecastIcon);
            })
        })
};


getWeather();

// events
// init (check local storage)
// search button to call the API and get the cream filling
// click on past city button to regenerate the forecast again (call the getWeather function with the label of button)