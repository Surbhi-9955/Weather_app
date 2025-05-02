document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const locationBtn = document.getElementById('location-btn');
    const themeBtn = document.getElementById('theme-btn');
    const loadingContainer = document.getElementById('loading');
    const errorContainer = document.getElementById('error-container');
    const indiaCitiesDatalist = document.getElementById('india-cities');
    
    // Weather display elements
    const locationElement = document.getElementById('location');
    const dateTimeElement = document.getElementById('date-time');
    const currentTempElement = document.getElementById('current-temp');
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherDescElement = document.getElementById('weather-desc');
    const windSpeedElement = document.getElementById('wind-speed');
    const humidityElement = document.getElementById('humidity');
    const feelsLikeElement = document.getElementById('feels-like');
    const visibilityElement = document.getElementById('visibility');
    const hourlyContainer = document.getElementById('hourly-container');
    const forecastDaysContainer = document.getElementById('forecast-days');
    const aqiProgress = document.getElementById('aqi-progress');
    const aqiValue = document.getElementById('aqi-value');
    const aqiCategory = document.getElementById('aqi-category');
    
    // Unit toggle elements
    const celsiusUnit = document.getElementById('celsius');
    const fahrenheitUnit = document.getElementById('fahrenheit');
    
    // API Configuration
    const API_KEY = '9509a4c1ecb34a97444a979773577701'; // Replace with your actual API key
    const BASE_URL = 'https://api.openweathermap.org/data/2.5';
    const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0';
    
    // State
    let currentUnit = 'celsius';
    let currentWeatherData = null;
    let isDarkMode = false;
    
    // Major Indian cities for autocomplete
    const indianCities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", 
        "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", 
        "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore", 
        "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad", 
        "Ludhiana", "Coimbatore", "Agra", "Madurai", "Nashik", 
        "Faridabad", "Meerut", "Rajkot", "Varanasi", "Srinagar", 
        "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", 
        "Ranchi", "Howrah", "Jabalpur", "Gwalior", "Vijayawada", 
        "Jodhpur", "Raipur", "Kota", "Guwahati", "Chandigarh", 
        "Thiruvananthapuram", "Ghazipur", "Tiruchirappalli", "Bareilly", 
        "Moradabad","Solapur","Srinagar","Bettiah","Bikaner",
        "Bhubaneswar","Dehradun","Durgapur","Kalyan-Dombivli","Mysore","Roorkee",
        "Saharanpur","Siliguri","Tirupati","Udaipur","Vadodara","Warangal","Motihari",
        "Adilabad","Agra","Ahmedabad","Ahmednagar","Aizawl","Ajitgarh (Mohali)","Ajmer",
        "Akola","Alappuzha","Aligarh","Alirajpur","Allahabad","Almora","Alwar",
        "Ambala","Ambedkar Nagar","Amravati","Amreli district","Amritsar","Anand",
        "Anantapur","Anantnag","Angul","Anjaw","Anuppur","Araria","Ariyalur",
        "Arwal","Ashok Nagar","Auraiya","Aurangabad","Aurangabad","Azamgarh",
        "Badgam","Bagalkot","Bageshwar","Bagpat","Bahraich","Baksa","Balaghat",
        "Balangir","Balasore","Ballia","Balrampur","Banaskantha","Banda",
        "Bandipora","Bangalore Rural","Bangalore Urban","Banka","Bankura",
        "Banswara","Barabanki","Baramulla","Baran","Bardhaman","Bareilly",
        "Bargarh (Baragarh)","Barmer","Barnala","Barpeta","Barwani","Bastar","Basti",
        "Bathinda","Beed","Begusarai","Belgaum","Bellary","Betul","Bhadrak",
        "Bhagalpur","Bhandara","Bharatpur","Bharuch","Bhavnagar","Bhilwara",
        "Bhind","Bhiwani","Bhojpur","Bhopal","Bidar","Bijapur","Bijapur",
        "Bijnor","Bikaner","Bilaspur","Bilaspur","Birbhum","Bishnupur","Bokaro",
        "Bongaigaon","Boudh (Bauda)","Budaun","Bulandshahr","Buldhana","Bundi",
         "Burhanpur","Buxar","Cachar","Central Delhi","Chamarajnagar","Chamba",
        "Chamoli","Champawat","Champhai","Chandauli","Chandel","Chandigarh",
        "Chandrapur","Changlang","Chhattisgarh","Chennai","Chhota Udaipur",
        "Chhotaudepur","Chikballapur","Chikmagalur","Chirang","Chitradurga",
        "Chitrakoot","Chittoor","Chittorgarh","Churachandpur","Churu","Coimbatore",
        "Cooch Behar","Cuddalore","Cuddalore","Cuttack","Dadra and Nagar Haveli",
        "Dahod","Dakshin Dinajpur","Dakshina Kannada","Daman","Damoh",
        "Dantewada","Darbhanga","Darjeeling","Darrang","Datia","Dausa", "Davanagere",
        "Debagarh (Deogarh)","Dehradun","Deoghar","Deoria","Dewas",
        "Dhalai","Dhamtari","Dhanbad","Dhar","Dharmapuri","Dharwad",
        "Dhemaji","Dhenkanal","Dholpur","Dhubri","Dhule","Dibang Valley",
         "Dibrugarh","Dima Hasao","Dimapur","Dindigul","Dindori","Diu","Doda",
        "Dumka","Dungapur","Durg","East Champaran","East Delhi",
        "East Garo Hills","East Khasi Hills","East Siang","East Sikkim",
        "East Singhbhum","Eluru","Ernakulam","Erode","Etah","Etawah",
        "Faizabad","Faridabad","Faridkot","Farrukhabad","Fatehabad",
        "Fatehgarh Sahib","Fatehpur","Fazilka","Firozabad","Firozpur",
         "Gadag","Gadchiroli","Gajapati","Ganderbal","Gandhinagar",
        "Ganganagar","Ganjam","Garhwa","Gautam Buddh Nagar","Gaya",
        "Ghaziabad","Ghazipur","Ghazipur","Giridih","Goalpara","Godda",
        "Golaghat","Gonda","Gondia","Gopalganj","Gorakhpur","Gulbarga",
        "Gumla","Guna","Guntur","Gurdaspur","Gurgaon","Gwalior",
        "Hailakandi","Hamirpur","Hamirpur","Hanumangarh","Harda",
        "Hardoi","Haridwar","Hassan","Haveri","Hazaribagh",
        "Hingoli","Hissar","Hooghly","Hoshangabad","Hoshiarpur",
        "Haryana","Himachal Pradesh","Howrah","Hyderabad","Hyderabad",
        "Idukki","Imphal East","Imphal West","Indore","Jabalpur",
        "Jagatsinghpur","Jaintia Hills","Jaipur","Jaisalmer",
        "Jajpur","Jalandhar","Jalaun","Jalgaon","Jalna",
        "Jalore","Jalpaiguri","Jammu","Jamnagar","Jamtara",
        "Jamui","Janjgir-Champa","Jashpur","Jaunpur district",
         "Jehanabad","Jhabua","Jhajjar","Jhalawar","Jhansi","Jharsuguda",
        "Jhunjhunu","Jind","Jodhpur","Jorhat","Junagadh",
        "Junnar","Kabirdham (formerly Kawardha)","Kachchh","Kaimur",
        "Kaithal","Kakching","Kalahandi","Kamareddy","Kamjong",
        "Kanchrapara","Kandhamal","Kangra","Kanker","Kannada",
        "Kannur","Kanpur","Kanshi Ram Nagar","Kanyakumari",
        "Kanshi Ram Nagar","Kapurthala","Karimganj","Karimnagar",
        "Karnal","Karur","Kasaragod","Kathua","Katihar",
        "Katni",
        "Kaushambi","Kendrapara","Kendujhar (Keonjhar)","Khagaria",
        "Khammam","Khandwa (East Nimar)","Khargone (West Nimar)",
        "Kheda","Khordha","Khowai","Khunti","Kinnaur",
         "Kishanganj","Kishtwar","Kodagu","Koderma","Kohima",
        "Kokrajhar","Kolar","Kolasib","Kolhapur","Kolkata",
        "Kollam","Koppal","Koraput","Korba","Koriya","Kota",
        "Kottayam","Kozhikode","Krishna","Kulgam","Kullu",
        "Kumargram","Kumta","Kurnool","Kurukshetra","Kurung Kumey",
        "Kushinagar","Kutch","Lahaul and Spiti","Lakhimpur",
        "Lakhimpur Kheri","Lakhisarai","Lalitpur","Latehar",
        "Latur","Lawngtlai","Leh","Lohardaga","Lohit",
        "Longding","Lucknow","Ludhiana","Lunglei","Madhubani",
        "Madurai","Maharajganj","Mahasamund","Mahbubnagar",
        "Mahe","Mahendragarh","Mahoba","Mainpuri","Malappuram",
        "Maldah","Malkangiri","Mamit","Mandi","Mandla","Mandsaur",
        "Mandla","Mansa","Mau","Mayurbhanj","Medak",
        "Meerut","Meghalaya","Mehsana","Mewat","Mirzapur",
        "Mizoram","Mohali","Moradabad","Morena","Mumbai City",
        "Mumbai suburban","Moga","Mokokchung","Mon",
        "Moradabad","Morena","Mumbai City","Mumbai suburban",
        "Munger","Murshidabad","Muzaffarnagar","Muzaffarpur",
        "Nagapattinam","Nagaur","Nagpur",
        "Nagaon","Nagar","Nadia",
        

    ];
    
    // Initialize app
    init();
    
    function init() {
        // Populate Indian cities datalist
        populateIndianCities();
        
        // Set up event listeners
        searchBtn.addEventListener('click', searchLocation);
        locationBtn.addEventListener('click', getLocationWeather);
        themeBtn.addEventListener('click', toggleTheme);
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLocation();
            }
        });
        
        celsiusUnit.addEventListener('click', () => toggleUnit('celsius'));
        fahrenheitUnit.addEventListener('click', () => toggleUnit('fahrenheit'));
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('weatherAppTheme');
        if (savedTheme === 'dark') {
            toggleTheme();
        }
        
        // Default to Delhi weather
        fetchWeather('Delhi,in');
    }
    
    function populateIndianCities() {
        indiaCitiesDatalist.innerHTML = '';
        indianCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            indiaCitiesDatalist.appendChild(option);
        });
    }
    
    function searchLocation() {
        const location = locationInput.value.trim();
        if (location) {
            // Append ',in' to prioritize Indian locations
            fetchWeather(`${location},in`);
        }
    }
    
    function getLocationWeather() {
        loadingContainer.style.display = 'flex';
        
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                showError('Geolocation blocked. Showing Delhi weather');
                fetchWeather('Delhi,in');
            }
        );
    }
    
    async function fetchWeather(location) {
        loadingContainer.style.display = 'flex';
        
        try {
            // Fetch current weather with India country code
            const currentResponse = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`
            );
            
            if (!currentResponse.ok) {
                throw new Error('Indian location not found. Please try another city.');
            }
            
            const currentData = await currentResponse.json();
            
            // Verify the location is in India
            if (currentData.sys.country !== 'IN') {
                throw new Error('Please search for cities in India only');
            }
            
            // Fetch forecast and air quality using coordinates
            const forecastResponse = await fetch(
                `${BASE_URL}/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric`
            );
            
            const airQualityResponse = await fetch(
                `${BASE_URL}/air_pollution?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}`
            );
            
            if (!forecastResponse.ok) {
                throw new Error('Forecast data not available');
            }
            
            const forecastData = await forecastResponse.json();
            const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;
            
            currentWeatherData = {
                current: currentData,
                forecast: forecastData,
                airQuality: airQualityData
            };
            
            updateUI();
            locationInput.value = '';
        } catch (error) {
            console.error('Error fetching weather data:', error);
            showError(error.message);
        } finally {
            loadingContainer.style.display = 'none';
        }
    }
    
    async function fetchWeatherByCoords(lat, lon) {
        loadingContainer.style.display = 'flex';
        
        try {
            // First get location name from coordinates
            const reverseGeoResponse = await fetch(
                `${GEOCODING_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
            );
            
            if (!reverseGeoResponse.ok) {
                throw new Error('Could not determine location name');
            }
            
            const locationData = await reverseGeoResponse.json();
            
            // Now fetch weather data
            const currentResponse = await fetch(
                `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            
            const forecastResponse = await fetch(
                `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            
            const airQualityResponse = await fetch(
                `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            
            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Weather data not available');
            }
            
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;
            
            currentWeatherData = {
                current: currentData,
                forecast: forecastData,
                airQuality: airQualityData
            };
            
            updateUI();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            showError(error.message);
        } finally {
            loadingContainer.style.display = 'none';
        }
    }
    
    function updateUI() {
        if (!currentWeatherData) return;
        
        const { current, forecast, airQuality } = currentWeatherData;
        
        // Update location and date
        let locationText = `${current.name}`;
        if (current.sys.state) {
            locationText += `, ${current.sys.state}`;
        }
        locationText += `, India`;
        locationElement.textContent = locationText;
        
        dateTimeElement.textContent = formatDateTime(current.dt, current.timezone);
        
        // Update current weather
        const temp = currentUnit === 'celsius' ? current.main.temp : celsiusToFahrenheit(current.main.temp);
        currentTempElement.textContent = Math.round(temp);
        
        const feelsLike = currentUnit === 'celsius' ? current.main.feels_like : celsiusToFahrenheit(current.main.feels_like);
        feelsLikeElement.textContent = `${Math.round(feelsLike)}°`;
        
        // Update weather icon and description
        const weatherIconClass = getWeatherIconClass(current.weather[0].id, current.weather[0].icon);
        weatherIconElement.innerHTML = `<i class="fas ${weatherIconClass}"></i>`;
        weatherDescElement.textContent = current.weather[0].description;
        
        // Update weather details
        windSpeedElement.textContent = `${current.wind.speed} km/h`;
        humidityElement.textContent = `${current.main.humidity}%`;
        visibilityElement.textContent = `${(current.visibility / 1000).toFixed(1)} km`;
        
        // Update hourly forecast
        updateHourlyForecast(forecast);
        
        // Update 5-day forecast
        updateDailyForecast(forecast);
        
        // Update air quality
        if (airQuality) {
            updateAirQuality(airQuality);
        }
    }
    
    function updateHourlyForecast(forecastData) {
        hourlyContainer.innerHTML = '';
        
        // Get current hour
        const now = new Date();
        const currentHour = now.getHours();
        
        // Find the starting index in the forecast list
        let startIndex = 0;
        for (let i = 0; i < forecastData.list.length; i++) {
            const forecastTime = new Date(forecastData.list[i].dt * 1000);
            if (forecastTime.getHours() >= currentHour) {
                startIndex = i;
                break;
            }
        }
        
        // Display next 12 hours (or as many as available)
        const hourlyForecasts = forecastData.list.slice(startIndex, startIndex + 12);
        
        hourlyForecasts.forEach(item => {
            const date = new Date(item.dt * 1000);
            const hour = date.getHours();
            const temp = currentUnit === 'celsius' ? item.main.temp : celsiusToFahrenheit(item.main.temp);
            const weatherIconClass = getWeatherIconClass(item.weather[0].id, item.weather[0].icon);
            
            const hourlyItem = document.createElement('div');
            hourlyItem.className = 'hourly-item';
            hourlyItem.innerHTML = `
                <p>${hour}:00</p>
                <i class="fas ${weatherIconClass}"></i>
                <p class="hourly-temp">${Math.round(temp)}°</p>
            `;
            
            hourlyContainer.appendChild(hourlyItem);
        });
    }
    
    function updateDailyForecast(forecastData) {
        forecastDaysContainer.innerHTML = '';
        
        // Group forecast by day
        const dailyForecast = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    minTemp: item.main.temp_min,
                    maxTemp: item.main.temp_max,
                    weatherId: item.weather[0].id,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                };
            } else {
                if (item.main.temp_min < dailyForecast[day].minTemp) {
                    dailyForecast[day].minTemp = item.main.temp_min;
                }
                if (item.main.temp_max > dailyForecast[day].maxTemp) {
                    dailyForecast[day].maxTemp = item.main.temp_max;
                }
            }
        });
        
        // Display next 5 days forecast
        const days = Object.keys(dailyForecast).slice(0, 5);
        days.forEach(day => {
            const forecast = dailyForecast[day];
            const minTemp = currentUnit === 'celsius' ? forecast.minTemp : celsiusToFahrenheit(forecast.minTemp);
            const maxTemp = currentUnit === 'celsius' ? forecast.maxTemp : celsiusToFahrenheit(forecast.maxTemp);
            const weatherIconClass = getWeatherIconClass(forecast.weatherId, forecast.icon);
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <p>${day}</p>
                <i class="fas ${weatherIconClass}"></i>
                <p>${forecast.description}</p>
                <div class="forecast-temp">
                    <span>${Math.round(maxTemp)}°</span>
                    <span>${Math.round(minTemp)}°</span>
                </div>
            `;
            
            forecastDaysContainer.appendChild(forecastDay);
        });
    }
    
    function updateAirQuality(airQualityData) {
        const aqi = airQualityData.list[0].main.aqi;
        aqiValue.textContent = aqi;
        
        // Set AQI progress bar
        let progressWidth = (aqi / 5) * 100;
        aqiProgress.style.width = `${progressWidth}%`;
        
        // Set color based on AQI
        let category, color;
        switch(aqi) {
            case 1:
                category = "Good";
                color = "#00e400";
                break;
            case 2:
                category = "Fair";
                color = "#ffff00";
                break;
            case 3:
                category = "Moderate";
                color = "#ff7e00";
                break;
            case 4:
                category = "Poor";
                color = "#ff0000";
                break;
            case 5:
                category = "Very Poor";
                color = "#99004c";
                break;
            default:
                category = "Unknown";
                color = "#cccccc";
        }
        
        aqiProgress.style.backgroundColor = color;
        aqiCategory.textContent = category;
        aqiCategory.style.color = color;
    }
    
    function toggleUnit(unit) {
        if (currentUnit === unit) return;
        
        currentUnit = unit;
        
        // Update active unit display
        if (unit === 'celsius') {
            celsiusUnit.classList.add('active');
            fahrenheitUnit.classList.remove('active');
        } else {
            fahrenheitUnit.classList.add('active');
            celsiusUnit.classList.remove('active');
        }
        
        // Update temperatures
        if (currentWeatherData) {
            updateUI();
        }
    }
    
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        
        // Update theme button icon
        themeBtn.innerHTML = `<i class="fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}"></i>`;
        
        // Save preference to localStorage
        localStorage.setItem('weatherAppTheme', isDarkMode ? 'dark' : 'light');
    }
    
    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
    }
    
    // Helper functions
    function formatDateTime(timestamp, timezone) {
        const date = new Date((timestamp + timezone) * 1000);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    
    function getWeatherIconClass(weatherId, icon) {
        // Map OpenWeatherMap weather codes to Font Awesome icons
        if (weatherId >= 200 && weatherId < 300) {
            return 'fa-bolt'; // Thunderstorm
        } else if (weatherId >= 300 && weatherId < 400) {
            return 'fa-cloud-rain'; // Drizzle
        } else if (weatherId >= 500 && weatherId < 600) {
            return icon.includes('d') ? 'fa-cloud-sun-rain' : 'fa-cloud-moon-rain'; // Rain
        } else if (weatherId >= 600 && weatherId < 700) {
            return 'fa-snowflake'; // Snow
        } else if (weatherId >= 700 && weatherId < 800) {
            return 'fa-smog'; // Atmosphere (fog, haze, etc.)
        } else if (weatherId === 800) {
            return icon.includes('d') ? 'fa-sun' : 'fa-moon'; // Clear
        } else if (weatherId > 800) {
            return icon.includes('d') ? 'fa-cloud-sun' : 'fa-cloud-moon'; // Clouds
        } else {
            return 'fa-question'; // Default
        }
    }
});