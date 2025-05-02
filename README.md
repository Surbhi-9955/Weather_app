# Weather_app
India Weather Pro is a clean, responsive weather application designed specifically for Indian cities. It provides current weather conditions, hourly forecasts, 5-day forecasts, and air quality information.

Features
Current Weather: Displays temperature, weather conditions, wind speed, humidity, feels-like temperature, and visibility
Hourly Forecast: Shows weather conditions for the next 24 hours
5-Day Forecast: Provides weather outlook for the next 5 days
Air Quality Index: Shows current AQI with color-coded indicators
Location Services:  Search for any Indian city
Use your current location
Unit Conversion: Toggle between Celsius and Fahrenheit
Dark/Light Mode: Toggle between different color themes

Technologies Used
HTML5
CSS3 (with Flexbox)
JavaScript (ES6+)
OpenWeatherMap API (or other weather API)
Geolocation API

Setup Instructions
Clone the repository:

bash
git clone https://github.com/yourusername/india-weather-pro.git
cd india-weather-pro
Get an API key:
Sign up for a free API key at OpenWeatherMap
Create a config.js file in your project directory:

javascript
const API_KEY = 'your_api_key_here';
Run the application:
Open index.html in your browser
Or set up a local server (e.g., using VS Code Live Server extension)

Usage
Enter an Indian city name in the search box or click the location button to use your current location
View current weather conditions and forecasts
Toggle between Celsius and Fahrenheit using the unit buttons
Switch between dark and light mode using the theme toggle

File Structure
india-weather-pro/
├── index.html          # Main application HTML
├── styles.css         # Stylesheet
├── script.js          # Main JavaScript functionality
├── config.js          # API key configuration (not included in repo)
└── README.md          # This file
Future Enhancements
Add regional weather alerts
Include rainfall predictions
Implement multilingual support
Add more detailed weather maps
Include pollen count and UV index

License
This project is open source and available under the MIT License.

Credits
Developed by Surbhi Kumari

Weather data provided by OpenWeatherMap

Icons from Google Fonts

