/**
 * OpenWeather API
 * Consuming OpenWeather API to get weather data
 * Author: sntaks
 */


const API_KEY = '34d8ea5330230d34c31c06aeb55a564e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export const getAllWeatherData = async (city) => {
    try{
        const geoCodeData = await getGeoCode(city);
        const { lat, lon } = geoCodeData[0];

        const weatherUrl = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
    }catch(error){
        // Handle errors (log, show user-friendly message, etc.)
        console.error('Error fetching weather data:', error.message);
        throw error; // Rethrow the error to propagate it to the calling code
    }
    
}

export const getGeoCode = async (city) => {
    try {
        const geoCodeUrl = `${GEOCODE_URL}?q=${city}&limit=5&appid=${API_KEY}`;
        const response = await fetch(geoCodeUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        // Handle errors (log, show user-friendly message, etc.)
        console.error('Error fetching geocode:', error.message);
        throw error; // Rethrow the error to propagate it to the calling code
    }
};

export const getWeatherData = async (city) => {
    const weatherData = await getAllWeatherData(city);
    const { 
        name,
        main: {
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            sea_level,
            grnd_level
        },
        weather: [
            {
                id,
                main: weatherMain,
                description,
                icon
            }
        ]
    } = weatherData;

    return {
        location: name,
        temperature: temp,
        weather: description
    }
}