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
    const hoursIn12hrFormat = hours >= 13 ? `0 {hours} % 12` :hours;
    const minutes = time.getMinutes();
    const ampm = hours >= 12? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12hrFormat<10 ? `0${hoursIn12hrFormat}`: hoursIn12hrFormat) + ':' + (minutes>10?minutes:`0${minutes}`) + ' '+ `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day]+', ' + date+' '+months[month]; 
}, 1000);



getWeatherData();

const getUserLocation = async () => {
    
}

getUserLocation();

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
const { humidity, wind_speed, pressure } = data.periods[0];

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
        <div>${""}</div>
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

