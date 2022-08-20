const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const curentWeatherItems = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastElement = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const API_KEY = "ef23a6c1ac61a393813ee9f2d70d60d2";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hours = time.getHours();
    const hoursIn12hrFormat = hours >= 13 ? hours % 12 :hours;
    const minutes = time.getMinutes();
    const ampm = hours >= 12? 'PM' : 'AM';

    timeEl.innerHTML = hoursIn12hrFormat + ':' + minutes+ ' '+ `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day]+', ' + date+' '+months[month]; 
}, 1000);

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        const { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then( res=> res.json())
        .then(data => {
            console.log(data);
            showWeatherData(data)
        })
    })
}

function showWeatherData(data) {
    const { pressure, humidity} = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset, country } = data.sys;

   curentWeatherItems.innerHTML = `
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    `;


}

