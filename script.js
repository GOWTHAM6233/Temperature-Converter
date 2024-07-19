function convertTemperature() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputScale = document.getElementById('inputScale').value;
    const outputScale = document.getElementById('outputScale').value;
    let result;

    if (isNaN(inputValue)) {
        alert('Please enter a valid number.');
        return;
    }

    if (inputScale === outputScale) {
        result = inputValue;
    } else {
        if (inputScale === 'celsius') {
            if (outputScale === 'fahrenheit') {
                result = (inputValue * 9/5) + 32;
            } else if (outputScale === 'kelvin') {
                result = inputValue + 273.15;
            }
        } else if (inputScale === 'fahrenheit') {
            if (outputScale === 'celsius') {
                result = (inputValue - 32) * 5/9;
            } else if (outputScale === 'kelvin') {
                result = ((inputValue - 32) * 5/9) + 273.15;
            }
        } else if (inputScale === 'kelvin') {
            if (outputScale === 'celsius') {
                result = inputValue - 273.15;
            } else if (outputScale === 'fahrenheit') {
                result = ((inputValue - 273.15) * 9/5) + 32;
            }
        }
    }

    document.getElementById('resultValue').textContent = `The converted temperature is ${result.toFixed(2)}° ${outputScale.charAt(0).toUpperCase() + outputScale.slice(1)}`;
}

function fetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = '806a2aee73614ff401d524c0e05bd9a9'; // Your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const temp = data.main.temp;
                    const description = data.weather[0].description;
                    const city = data.name;
                    const country = data.sys.country;
                    const weatherInfo = `Location: ${city}, ${country} - Current temperature: ${temp}°C, ${description}`;
                    document.getElementById('weatherInfo').textContent = weatherInfo;
                })
                .catch(error => {
                    document.getElementById('weatherInfo').textContent = 'Unable to fetch weather data';
                });
        });
    } else {
        document.getElementById('weatherInfo').textContent = 'Geolocation is not supported by this browser.';
    }
}

window.onload = fetchWeather;
