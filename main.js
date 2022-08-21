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
    const hoursIn12hrFormat = (hours >= 13 ? `${hours%12}` :hours);
    const minutes = time.getMinutes();
    const ampm = hours >= 12? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12hrFormat<10 ? `0${hoursIn12hrFormat}`: hoursIn12hrFormat) + ':' + (minutes>10?minutes:`0${minutes}`) + ' '+ `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day]+', ' + date+' '+months[month]; 
}, 1000);



getWeatherData();

// const getUserLocation = async () => {
    
// }
// getUserLocation();

async function getWeatherData() {
    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");

        const request = await fetch("https://ipinfo.io/json?token=1255f1f46e8096")
        const json = await request.json()  
        console.log(json);
        let state = json.city.toLowerCase();
        let country = json.country.toLowerCase(); 

        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '038f4561dbmshe3e2d5e7f273082p128631jsn928d8bbf16ff',
                'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
            }
        };
    
        fetch(`https://aerisweather1.p.rapidapi.com/forecasts/${state},${country}?from=${year}${month}${date}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showWeatherData(data.response[0]);
        })
        .catch(err => console.error(err));
}

function showWeatherData(data) {
    let time = new Date();
    let presentDay = time.getDay()+1;
    const { humidity, icon, avgTempC, pressureMB, sunrise, sunset, weather, feelslikeC, windSpeedMPH } = data.periods[presentDay<7?presentDay:0];
    const { tz } = data.profile;
    const { lat, long } = data.loc;

    timeZone.innerHTML = tz;
    countryEl.innerHTML = `Latitude: ${lat}, Longitude: ${long}`;
    document.getElementById('weather').innerHTML = `${feelslikeC}&#176; C, ${weather}`;

   curentWeatherItems.innerHTML = `
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressureMB}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${windSpeedMPH} mph</div>
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

    data.periods.forEach((day, i) => {
        const days = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thur", "Fri"]
        const weatherForecastItem = document.createElement('div');
        weatherForecastItem.classList.add('weather-forecast-item');
        weatherForecastItem.innerHTML = `
                <div class="day">${days[i]}</div>
                <img src="./AerisIcons/${day.icon}" alt="weather-icon" class="w-icon">
                <div class="temp">Night - ${day.minTempC}&#176; C</div>
                <div class="temp">Day - ${day.maxTempC}&#176; C</div>
        `;
        weatherForecastElement.appendChild(weatherForecastItem);

    });

  /*<div class="weather-forecast-item">
                <div class="day">Mon</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Tue</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Wed</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Thur</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Fri</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Sat</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Sun</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div> */  


}

