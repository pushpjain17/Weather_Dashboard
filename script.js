// script.js
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const apiKey = '7a6ecc36cd303f10d936c8c676bbea5e'; // 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        document.getElementById('loading-indicator').style.display = 'block';
        document.getElementById('weather-info').innerHTML = '';
        document.getElementById('forecast-info').innerHTML = '';

        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayWeatherData(weatherData);
        displayForecastData(forecastData);
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    } finally {
        document.getElementById('loading-indicator').style.display = 'none';
    }
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <i class="wi wi-owm-${data.weather[0].id}"></i>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecastData(data) {
    const forecastInfo = document.getElementById('forecast-info');
    forecastInfo.innerHTML = '<h2>5-Day Forecast</h2>';

    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
            const date = new Date(forecast.dt * 1000);
            forecastInfo.innerHTML += `
                <div class="forecast-item">
                    <i class="wi wi-owm-${forecast.weather[0].id}"></i>
                    <div>
                        <p>${date.toDateString()}</p>
                        <p>Temperature: ${forecast.main.temp}°C</p>
                        <p>Weather: ${forecast.weather[0].description}</p>
                    </div>
                </div>
            `;
        }
    });
}
