// Select weather elements
const currentWeatherContent = document.querySelector('.weather-content');
const forecastContent = document.querySelector('.forecast-content');

// Weather API parameters
const lat = -0.09419855105809864;
const lon = 34.76492759514564;
const apiKey = 'ef8d39f6a030df3c04d3a9217a28747a';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) throw Error(await weatherResponse.text());
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw Error(await forecastResponse.text());
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Fetch error:', error);
        handleWeatherError();
    }
}

function displayCurrentWeather(data) {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', 
        {hour: '2-digit', minute: '2-digit'});
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', 
        {hour: '2-digit', minute: '2-digit'});
    
    currentWeatherContent.innerHTML = `
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" 
            alt="${data.weather[0].description}" class="weather-icon">
        <p class="temperature">${Math.round(data.main.temp)}° F</p>
        <p>${data.weather[0].description}</p>
        <div class="weather-details">
            <p>High: ${Math.round(data.main.temp_max)}°</p>
            <p>Low: ${Math.round(data.main.temp_min)}°</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        </div>
    `;
}

function displayForecast(data) {
    const days = ['Today', 'Wednesday', 'Thursday'];
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    
    const forecastHTML = dailyData.map((day, index) => 
        `<p>${days[index]}: ${Math.round(day.main.temp)}°F</p>`
    ).join('');
    
    forecastContent.innerHTML = forecastHTML;
}

function handleWeatherError() {
    currentWeatherContent.innerHTML = '<p>Weather data currently unavailable</p>';
    forecastContent.innerHTML = '<p>Forecast currently unavailable</p>';
}

// Initial weather fetch and update every 30 minutes
getWeather();
setInterval(getWeather, 1800000);