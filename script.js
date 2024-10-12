const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const inputField = document.querySelector('.search-box input');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');
const image = document.querySelector('.weather-box img');

search.addEventListener('click', () => {
    const APIKey = 'a6f11c04f9a1b3b5bee382390bef8b11';
    const city = inputField.value.trim();

    if (city === '') return; 

    // Disable the search button
    search.disabled = true;
    search.style.cursor = 'not-allowed';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.cod === 200) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'clear.png';
                        break;
                    case 'Rain':
                        image.src = 'rain.png';
                        break;
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'cloud.png';
                        break;
                    case 'Mist':
                        image.src = 'mist.png';
                        break;
                    case 'Haze':
                        image.src = 'haze.png';
                        break;
                    default:
                        image.src = 'error.png';
                        break;
                }

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;
            } else {
                temperature.innerHTML = 'Error';
                description.innerHTML = json.message;
                humidity.innerHTML = 'N/A';
                wind.innerHTML = 'N/A';
                image.src = 'error.png'; // Add an error image to your project
            }
        })
        .catch(err => {
            temperature.innerHTML = 'Error';
            description.innerHTML = 'Unable to fetch weather data';
            humidity.innerHTML = 'N/A';
            wind.innerHTML = 'N/A';
            image.src = 'error.png'; // Add an error image to your project
        })
        .finally(() => {
            // Re-enable the search button
            search.disabled = false;
            search.style.cursor = 'pointer';
        });
});
