// global variables
let key = '41fb0d420da1aa1f169bc441322e7bd5';

let cityName = document.querySelector('.city-name');
let date = document.querySelector('.date');
let icon = document.querySelector('.icon');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let uvIndex = document.querySelector('.uv-index');
let forecastContainer = document.querySelector('.forecast-container');
let searchButton = document.querySelector('.search-button');


// functions
// init
// check local storage for the key (cities)
// if present, dynamically create buttons with then button label as the city
// save the city the user searched to local storage, but check local storage for that city first, don't add if already there

function getCityName(event) {
    event.preventDefault();
    let citySearch = document.querySelector('.city-search').value;
    getWeather(citySearch);
}

function getWeather(citySearch) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            let nameValue = data['name'];
            let dateValue = new Date(data.dt * 1000);
            let options = { date };
            let weatherIcon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            let tempValue = data['main']['temp'];
            let windValue = data['wind']['speed'];
            let humidityValue = data['main']['humidity'];
            cityName.innerHTML = nameValue;
            date.innerHTML = new Intl.DateTimeFormat('en-US', options).format(dateValue);
            icon.innerHTML = weatherIcon;
            temp.innerHTML = tempValue;
            wind.innerHTML = windValue;
            humidity.innerHTML = humidityValue;
            icon.setAttribute('src', weatherIcon);
            getCoord(citySearch);
        })
};

function getCoord(citySearch) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            getUVI(lat, lon);
            getFiveDay(lat, lon);
        })
};

function getUVI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            let uviValue = data['current']['uvi'];
            uvIndex.innerHTML = uviValue;
        })
};

function getFiveDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            forecastContainer.innerHTML = "";
            data.daily.forEach((day, index) => {
                if (index === 0 || index > 5) {
                    return;
                };
                let forecastDate = new Date(day.dt * 1000);
                let options = { date };
                let forecastIcon = 'https://openweathermap.org/img/w/' + day.weather[0].icon + '.png';
                let forecastIconDesc = day.weather[0].description || weather[0].main;
                let forecastTemp = day.temp.day;
                let forecastWind = day.wind_speed;
                let forecastHumidity = day.humidity;
                let forecastCard = document.createElement('div');
                let cardDate = document.createElement('h3');
                let cardIcon = document.createElement('img');
                let cardTemp = document.createElement('p');
                let cardWind = document.createElement('p');
                let cardHumidity = document.createElement('p');
                forecastContainer.append(forecastCard);
                cardIcon.setAttribute('src', forecastIcon);
                cardIcon.setAttribute('alt', forecastIconDesc);
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
            })
        })
};



searchButton.addEventListener('click', getCityName);

// events
// init (check local storage)
// search button to call the API and get the cream filling
// click on past city button to regenerate the forecast again (call the getWeather function with the label of button)