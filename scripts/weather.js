// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Declare the API URL with your API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=metric&appid=ef8d39f6a030df3c04d3a9217a28747a';

// Asynchronous function to fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Testing
            displayResults(data); // Call the function to display the results
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

// Function to display the results
function displayResults(data) {
    currentTemp.textContent = `${data.main.temp.toFixed(1)}°C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = data.weather[0].description;
}

// Invoke the function
apiFetch();