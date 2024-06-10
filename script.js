document.addEventListener('DOMContentLoaded', () => {
    const loc = document.getElementById("location");
    const tempIcon = document.getElementById("temp-icon");
    const tempValue = document.getElementById("temp-value");
    const climate = document.getElementById("climate");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    const API_KEY = 'dab3af44de7d24ae7ff86549334e45bd';
    const KELVIN_TO_CELSIUS = 273.15;

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        getWeather(searchInput.value);
        searchInput.value = '';
    });

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`, { mode: 'cors' });
            const weatherData = await response.json();
            updateWeather(weatherData);
        } catch (error) {
            alert('City not found');
        }
    };

    const updateWeather = (weatherData) => {
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - KELVIN_TO_CELSIUS);

        if (id >= 200 && id < 300) {
            tempIcon.src = "./icons/thunderstorm.svg";
        } else if (id >= 300 && id < 400) {
            tempIcon.src = "./icons/cloud-solid.svg";
        } else if (id >= 500 && id < 600) {
            tempIcon.src = "./icons/rain.svg";
        } else if (id >= 600 && id < 700) {
            tempIcon.src = "./icons/snow.svg";
        } else if (id >= 700 && id < 800) {
            tempIcon.src = "./icons/clouds.svg";
        } else if (id === 800) {
            tempIcon.src = "./icons/clouds-and-sun.svg";
        }
    };

    const fetchLocationWeather = async (lat, long) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`, { mode: 'cors' });
            const weatherData = await response.json();
            updateWeather(weatherData);
        } catch (error) {
            console.error('Error fetching location weather:', error);
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchLocationWeather(latitude, longitude);
        });
    }
});
