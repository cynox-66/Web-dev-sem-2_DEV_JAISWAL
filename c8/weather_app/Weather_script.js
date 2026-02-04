/**
 * Weather App — Scene-Based Experience
 * Creates illustrated weather scenes with ambient particles
 */

// --- DOM References ---
const elements = {
  searchInput: document.getElementById('location-input'),
  searchButton: document.getElementById('search'),
  scene: document.getElementById('scene'),
  particles: document.getElementById('particles'),
  temperature: document.getElementById('temperature'),
  feelsLike: document.getElementById('feels-like'),
  condition: document.getElementById('condition'),
  mood: document.getElementById('mood'),
  location: document.getElementById('location'),
  time: document.getElementById('time'),
  day: document.getElementById('day')
};

// --- Configuration ---
const config = {
  apiKey: 'c7236d36debb4636a18170654262201',
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

// --- Weather Scene Mapping ---
const weatherScenes = {
  sunny: {
    className: 'scene-sunny',
    particles: 'clouds',
    particleCount: 3
  },
  cloudy: {
    className: 'scene-cloudy',
    particles: 'clouds',
    particleCount: 5
  },
  rainy: {
    className: 'scene-rainy',
    particles: 'rain',
    particleCount: 40
  },
  night: {
    className: 'scene-night',
    particles: 'stars',
    particleCount: 30
  },
  snowy: {
    className: 'scene-snowy',
    particles: 'snow',
    particleCount: 25
  }
};

// Condition to scene mapping
const conditionMap = {
  'Sunny': 'sunny',
  'Clear': 'sunny',
  'Partly cloudy': 'cloudy',
  'Cloudy': 'cloudy',
  'Overcast': 'cloudy',
  'Mist': 'cloudy',
  'Fog': 'cloudy',
  'Patchy rain possible': 'rainy',
  'Light rain': 'rainy',
  'Moderate rain': 'rainy',
  'Heavy rain': 'rainy',
  'Light drizzle': 'rainy',
  'Patchy light drizzle': 'rainy',
  'Patchy snow possible': 'snowy',
  'Light snow': 'snowy',
  'Moderate snow': 'snowy',
  'Heavy snow': 'snowy',
  'Blizzard': 'snowy'
};

// --- Mood Label Generator ---
function generateMoodLabel(temp, condition, isDay) {
  const tempNum = parseFloat(temp);
  
  // Time-based prefix
  const timePrefix = isDay ? 
    (new Date().getHours() < 17 ? 'afternoon' : 'evening') : 
    'night';
  
  // Temperature feeling
  if (tempNum >= 30) return `A warm ${timePrefix}`;
  if (tempNum >= 20) return `A pleasant ${timePrefix}`;
  if (tempNum >= 10) return `A cool ${timePrefix}`;
  if (tempNum >= 0) return `A chilly ${timePrefix}`;
  return `A cold ${timePrefix}`;
}

// --- Scene Management ---
function changeScene(sceneType) {
  // Remove all scene classes
  Object.values(weatherScenes).forEach(scene => {
    elements.scene.classList.remove(scene.className);
  });
  
  // Add new scene class
  const scene = weatherScenes[sceneType] || weatherScenes.sunny;
  elements.scene.classList.add(scene.className);
  
  // Update particles
  createParticles(scene.particles, scene.particleCount);
}

// --- Particle System ---
function createParticles(type, count) {
  // Clear existing particles
  elements.particles.innerHTML = '';
  
  if (type === 'clouds') {
    createCloudParticles(count);
  } else if (type === 'rain') {
    createRainParticles(count);
  } else if (type === 'snow') {
    createSnowParticles(count);
  } else if (type === 'stars') {
    createStarParticles(count);
  }
}

function createCloudParticles(count) {
  for (let i = 0; i < count; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'particle-cloud';
    
    const size = 60 + Math.random() * 80;
    const top = Math.random() * 40 + 10;
    const duration = 40 + Math.random() * 30;
    const delay = Math.random() * -30;
    
    cloud.style.cssText = `
      width: ${size}px;
      height: ${size * 0.4}px;
      top: ${top}%;
      left: ${Math.random() * -20}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${0.3 + Math.random() * 0.3};
    `;
    
    elements.particles.appendChild(cloud);
  }
}

function createRainParticles(count) {
  for (let i = 0; i < count; i++) {
    const rain = document.createElement('div');
    rain.className = 'particle-rain';
    
    const height = 15 + Math.random() * 25;
    const left = Math.random() * 100;
    const duration = 0.5 + Math.random() * 0.5;
    const delay = Math.random() * -2;
    
    rain.style.cssText = `
      height: ${height}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${0.3 + Math.random() * 0.4};
    `;
    
    elements.particles.appendChild(rain);
  }
}

function createSnowParticles(count) {
  for (let i = 0; i < count; i++) {
    const snow = document.createElement('div');
    snow.className = 'particle-snow';
    
    const size = 3 + Math.random() * 4;
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * -5;
    
    snow.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${0.6 + Math.random() * 0.4};
    `;
    
    elements.particles.appendChild(snow);
  }
}

function createStarParticles(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'particle-star';
    
    const left = Math.random() * 100;
    const top = Math.random() * 60;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * -3;
    
    star.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    
    elements.particles.appendChild(star);
  }
}

// --- API Functions ---
async function fetchWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${encodeURIComponent(location)}&aqi=no`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Location not found');
    }
    throw new Error('Unable to fetch weather');
  }
  
  return response.json();
}

// --- Display Update ---
function updateDisplay(data) {
  const temp = Math.round(data.current.temp_c);
  const feelsLike = Math.round(data.current.feelslike_c);
  const locationName = data.location.name;
  const localtime = data.location.localtime;
  const [date, time] = localtime.split(' ');
  const conditionText = data.current.condition.text;
  const isDay = data.current.is_day === 1;
  
  // Format time (12-hour)
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const formattedTime = `${displayHour}:${minutes} ${ampm}`;
  
  // Get day name
  const dayName = config.dayNames[new Date(date).getDay()];
  
  // Determine scene
  let sceneType = conditionMap[conditionText] || 'sunny';
  if (!isDay && (sceneType === 'sunny' || sceneType === 'cloudy')) {
    sceneType = 'night';
  }
  
  // Generate mood label
  const moodLabel = generateMoodLabel(temp, conditionText, isDay);
  
  // Update DOM
  elements.temperature.textContent = `${temp}°`;
  elements.feelsLike.textContent = `Feels like ${feelsLike}°`;
  elements.condition.textContent = conditionText;
  elements.mood.textContent = moodLabel;
  elements.location.textContent = locationName;
  elements.time.textContent = formattedTime;
  elements.day.textContent = dayName;
  
  // Change scene
  changeScene(sceneType);
}

// --- Search Handler ---
async function handleSearch() {
  const query = elements.searchInput.value.trim();
  
  if (!query) {
    elements.searchInput.placeholder = 'Please enter a location';
    setTimeout(() => {
      elements.searchInput.placeholder = 'Where are you?';
    }, 2000);
    return;
  }
  
  try {
    const data = await fetchWeather(query);
    updateDisplay(data);
    elements.searchInput.value = '';
  } catch (error) {
    elements.condition.textContent = 'Location not found';
    elements.mood.textContent = 'Try searching for a city name';
    console.error('Weather fetch error:', error);
  }
}

// --- Event Listeners ---
elements.searchButton.addEventListener('click', handleSearch);

elements.searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// --- Initialize ---
function initialize() {
  // Set default sunny scene
  changeScene('sunny');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}