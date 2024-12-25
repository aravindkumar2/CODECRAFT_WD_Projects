const apiKey = 'c982752ccdabca697a6a0067133a0bd8';

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        console.log(`Fetching weather for location: ${location}`);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => {
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error.message);
                alert('Error fetching weather data. Please check your API key and try again.');
            });
    } else {
        alert('Please enter a valid location');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(`Fetching weather for coordinates: ${latitude}, ${longitude}`);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => {
                    console.log(`Response status: ${response.status}`);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data:', data);
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error.message);
                    alert('Error fetching weather data. Please check your API key and try again.');
                });
        }, error => {
            console.error('Error getting geolocation:', error.message);
            alert('Error getting geolocation. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        alert('Location not found. Please try a different location.');
    }
}
