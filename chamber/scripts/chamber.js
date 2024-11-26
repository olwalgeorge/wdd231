document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ef8d39f6a030df3c04d3a9217a28747a';
    const lat = -0.09351190648487417;
    const lon = 34.77110740447364;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });

    // Fetch forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            updateForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
});

function updateCurrentWeather(data) {
    const iconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const highLowElement = document.getElementById('high-low');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    conditionElement.textContent = data.weather[0].description;
    highLowElement.textContent = `High: ${Math.round(data.main.temp_max)}°C | Low: ${Math.round(data.main.temp_min)}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind: ${data.wind.speed} m/s`;
    sunriseElement.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunsetElement.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}

function updateForecast(data) {
    const forecastContent = document.getElementById('forecast-content');
    forecastContent.innerHTML = ''; // Clear existing content

    // Get the next 3 days of forecast (excluding today)
    const threeDayForecast = data.list.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        const today = new Date();
        return itemDate.getDate() !== today.getDate() && itemDate.getHours() === 12; // Noon forecast
    }).slice(0, 3);

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;

        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p>${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
            <p>${temp}°C</p>
        `;
        forecastContent.appendChild(dayElement);
    });
}