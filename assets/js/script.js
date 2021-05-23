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
let searchBtn = document.querySelector('.search-btn');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityBtns = document.querySelector('.city-btns');

function init() {
    let citiesStorage = localStorage.getItem('cities');
    if (citiesStorage) {
        cities = JSON.parse(citiesStorage);
        console.log(cities);
        renderCities();
    };
}

function getCityName(event) {
    event.preventDefault();
    let citySearch = document.querySelector('.city-search').value;
    document.getElementById("citySearch").value = "";
    getWeather(citySearch);
    saveCitySearch(citySearch);
}

function getWeather(citySearch) {
    let city = citySearch.target || citySearch;
    city = citySearch.target ?
        city.getAttribute('data-city') : citySearch;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`)
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
            temp.innerHTML = `Temperature: ${tempValue}°`;
            wind.innerHTML = `Wind: ${windValue} mph`;
            humidity.innerHTML = `Humidity: ${humidityValue}%`;
            icon.setAttribute('src', weatherIcon);
            getCoord(city);
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
            if (uviValue < 2) {
                uvIndex.setAttribute('class', 'low');
            }
            else if (uviValue < 5) {
                uvIndex.setAttribute('class', 'moderate')
            }
            else if (uviValue < 7) {
                uvIndex.setAttribute('class', 'high');
            }
            else if (uviValue < 10) {
                uvIndex.setAttribute('class', 'very-high');
            }
            else {
                uvIndex.setAttribute('class', 'extreme')
            }
            uvIndex.innerHTML = `UV Index: ${uviValue}`;
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
                forecastCard.setAttribute('class', 'card');
                forecastCard.setAttribute('class', 'my-card');
                cardIcon.setAttribute('src', forecastIcon);
                cardIcon.setAttribute('alt', forecastIconDesc);
                cardIcon.setAttribute('class', 'card-icon');
                forecastCard.append(cardDate);
                forecastCard.append(cardIcon);
                forecastCard.append(cardTemp);
                forecastCard.append(cardWind);
                forecastCard.append(cardHumidity);
                cardDate.innerHTML = new Intl.DateTimeFormat('en-US', options).format(forecastDate);
                cardIcon.innerHTML = forecastIcon;
                cardTemp.innerHTML = `Temperature: ${forecastTemp}°`;
                cardWind.innerHTML = `Wind: ${forecastWind} mph`;
                cardHumidity.innerHTML = `Humidity: ${forecastHumidity}%`;
            })
        })
};

function saveCitySearch(citySearch) {
    if (!cities.includes(citySearch)) {
        cities.push(citySearch);
    }
    localStorage.setItem('cities', JSON.stringify(cities));
    renderCities();
    console.log(cities);
}

function renderCities() {
    cityBtns.textContent = '';
    cities = cities.slice(Math.max(cities.length - 5, 0));
    cities.forEach(city => {
        let btn = document.createElement('button');
        cityBtns.prepend(btn);
        btn.setAttribute('class', 'btn btn-outline-secondary btn-block');
        btn.setAttribute('data-city', city);

        btn.innerHTML = city;
    })
}

searchBtn.addEventListener('click', getCityName);
cityBtns.addEventListener('click', () => getWeather(event));
init();