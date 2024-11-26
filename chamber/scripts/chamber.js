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
        <div class="forecast-item">
            <span>${dayName}</span>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
            <span>${temp}°C</span>
        </div>
    `;
    forecastContent.appendChild(dayElement);
    });
}

// load business card

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error loading member data:', error);
        document.getElementById('spotlightSection').innerHTML = 'Failed to load member data';
    }
}

function displaySpotlights(members) {
    const spotlightSection = document.getElementById('spotlightSection');
    spotlightSection.innerHTML = ''; // Clear existing content

    // Filter for gold (level 3) and silver (level 2) members
    const eligibleMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3
    );

    // Randomly select 3 members
    const selectedMembers = shuffleArray(eligibleMembers).slice(0, 3);

    // Create and append cards for selected members
    selectedMembers.forEach(member => {
        const card = createMemberCard(member);
        spotlightSection.appendChild(card);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'business-card';

    // Convert membership level number to text
    const membershipText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';

    card.innerHTML = `
        <div class="card-header">
            <h3>${member.name}</h3>
            <p class="tagline">${member.description}</p>
        </div>
        <div class="card-content">
            <img src="${member.image.replace('../', '')}" alt="${member.name}" class="business-image">
            <div class="contact-info">
                <p><span>EMAIL:</span> ${member.website.replace('https://', '')}</p>
                <p><span>PHONE:</span> ${member.phone}</p>
                <p><span>URL:</span> ${member.website.replace('https://', '')}</p>
            </div>
        </div>
    `;
    
    return card;
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadMembers);