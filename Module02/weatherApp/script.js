const state={
    location:{
        name:"Addis Ababa",
        latitude:8.9806,
        longitude:38.7578,
        region:"",
        country:"Ethiopia"},
    weather:null,
    favorites:[],
    savedCities:[],
    settings:{theme:"light"}};

// elements 
    
const searchForm=document.querySelector("#search-form");
const citySearch=document.querySelector("#city-search");
const searchStatus=document.querySelector(".search-status");
const currentLocation=document.querySelector("#current-location");
const heroCity=document.querySelector("#hero-city");
const heroRegion=document.querySelector("#hero-region");
const heroTime=document.querySelector("#hero-time");
const heroIcon=document.querySelector("#hero-icon");
const heroTemp=document.querySelector("#hero-temp");
const heroCondition=document.querySelector("#hero-condition");
const heroFeels=document.querySelector("#hero-feels");
const heroHumidity=document.querySelector("#hero-humidity");
const heroWind=document.querySelector("#hero-wind");
const heroPressure=document.querySelector("#hero-pressure");
const heroVisibility=document.querySelector("#hero-visibility");
const heroMinMax=document.querySelector("#hero-minmax");
const heroRain=document.querySelector("#hero-rain");
const heroSunrise=document.querySelector("#hero-sunrise");
const heroSunset=document.querySelector("#hero-sunset");
const alertMessage=document.querySelector("#alert-message");
const hourlyStrip=document.querySelector("#hourly-strip");
const weekList=document.querySelector("#week-list");
const citiesGrid=document.querySelector("#cities-grid");
const weeklyAverage=document.querySelector("#wk-avg-temp");
const weeklyRainfall=document.querySelector("#wk-rainfall");
const weeklyRainyDays=document.querySelector("#wk-rainy-days");
const weeklySunshine=document.querySelector("#wk-sunshine");
const favoriteList=document.querySelector("#fav-list");
const savedCityList=document.querySelector("#saved-list");
const addFavoriteButton=document.querySelector("#add-favorite");
const addSavedButton=document.querySelector("#add-saved");
const clearFavorites=document.querySelector("#clear-favorites");
const clearSaved=document.querySelector("#clear-saved");
const themeToggle=document.querySelector("#theme-toggle");
const themeIcon=document.querySelector("#theme-icon");
const previousHours=document.querySelector("#previous-hours");
const nextHours=document.querySelector("#next-hours");
let hourlyStart=0;



function loadState(){const saved=localStorage.getItem("boleWeatherState");if(saved){try{const stored=JSON.parse(saved);Object.assign(state,stored)}catch(error){console.error(error)}}}
function saveState(){localStorage.setItem("boleWeatherState",JSON.stringify(state))}
function applyTheme(){document.body.classList.toggle("dark",state.settings.theme==="dark");themeIcon.textContent=state.settings.theme==="dark"?"☾":"☀";themeToggle.setAttribute("aria-label",state.settings.theme==="dark"?"Switch to light theme":"Switch to dark theme")}
themeToggle.addEventListener("click",()=>{state.settings.theme=state.settings.theme==="light"?"dark":"light";applyTheme();saveState()});
searchForm.addEventListener("submit",async event=>{event.preventDefault();const city=citySearch.value.trim();if(!city){searchStatus.textContent="Please enter a city.";return}searchStatus.textContent="Searching...";try{await searchCity(city);searchStatus.textContent=""}catch(error){console.error(error);searchStatus.textContent="We couldn't find that city."}});

async function searchCity(city){const locationUrl=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;const response=await fetch(locationUrl);if(!response.ok)throw new Error("Geocoding request failed.");const data=await response.json();if(!data.results||!data.results.length)throw new Error("City not found.");const result=data.results[0];state.location={name:result.name,latitude:result.latitude,longitude:result.longitude,region:result.admin1||"",country:result.country||""};saveState();await fetchWeather(result.latitude,result.longitude,result.name,result.admin1||"",result.country||"")}
async function fetchWeather(latitude,longitude,cityName,region,country){const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,pressure_msl,wind_speed_10m,visibility&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,precipitation_probability_max,sunrise,sunset&timezone=auto&forecast_days=7`;const response=await fetch(weatherUrl);if(!response.ok)throw new Error("Weather request failed.");const data=await response.json();state.weather=data;saveState();renderWeather(data,cityName,region,country)}
function weatherDescription(code){const descriptions={0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Rime fog",51:"Light drizzle",53:"Moderate drizzle",55:"Dense drizzle",61:"Slight rain",63:"Moderate rain",65:"Heavy rain",71:"Slight snow",73:"Moderate snow",75:"Heavy snow",80:"Slight rain showers",81:"Moderate rain showers",82:"Violent rain showers",95:"Thunderstorm",96:"Thunderstorm with slight hail",99:"Thunderstorm with heavy hail"};return descriptions[code]||"Unknown conditions"}
function weatherIcon(code){if(code===0)return"☀";if([1,2].includes(code))return"🌤";if([3,45,48].includes(code))return"☁";if([51,53,55,61,63,65,80,81,82].includes(code))return"🌧";if([95,96,99].includes(code))return"⛈";if([71,73,75].includes(code))return"❄";return"🌤"}
function renderWeather(weather,cityName,region,country){const current=weather.current;const daily=weather.daily;currentLocation.textContent=cityName;heroCity.textContent=cityName;heroRegion.textContent=[region,country].filter(Boolean).join(", ");heroTime.textContent=formatTime(current.time);heroTime.dateTime=current.time;heroIcon.textContent=weatherIcon(current.weather_code);heroTemp.textContent=`${Math.round(current.temperature_2m)}°`;heroCondition.textContent=weatherDescription(current.weather_code);heroFeels.textContent=`Feels like ${Math.round(current.apparent_temperature)}°`;heroHumidity.textContent=`${current.relative_humidity_2m}%`;heroWind.textContent=`${Math.round(current.wind_speed_10m)} km/h`;heroPressure.textContent=`${Math.round(current.pressure_msl)} hPa`;heroVisibility.textContent=`${(current.visibility/1000).toFixed(1)} km`;heroMinMax.textContent=`${Math.round(daily.temperature_2m_min[0])}° / ${Math.round(daily.temperature_2m_max[0])}°`;heroRain.textContent=`${daily.precipitation_probability_max[0]||0}%`;heroSunrise.textContent=formatTime(daily.sunrise[0]);heroSunset.textContent=formatTime(daily.sunset[0]);alertMessage.textContent=current.weather_code>=95?"Thunderstorm conditions are possible.":"No significant weather alerts.";renderHourly(weather);renderWeekly(weather);renderWeeklyReport(weather)}
function renderHourly(weather){hourlyStrip.innerHTML="";const end=Math.min(hourlyStart+12,weather.hourly.time.length);for(let i=hourlyStart;i<end;i++){const article=document.createElement("article");article.innerHTML=`<strong>${formatTime(weather.hourly.time[i])}</strong><span>${weatherIcon(weather.hourly.weather_code[i])}</span><strong>${Math.round(weather.hourly.temperature_2m[i])}°</strong><small>${weather.hourly.precipitation_probability[i]||0}% rain</small>`;hourlyStrip.appendChild(article)}}
function renderWeekly(weather){weekList.innerHTML="";for(let i=0;i<weather.daily.time.length;i++){const article=document.createElement("article");const date=new Date(`${weather.daily.time[i]}T12:00:00`);article.innerHTML=`<strong>${i===0?"Today":date.toLocaleDateString([], {weekday:"short"})}</strong><span>${weatherIcon(weather.daily.weather_code[i])}</span><span>${Math.round(weather.daily.temperature_2m_min[i])}° / ${Math.round(weather.daily.temperature_2m_max[i])}°</span><span>${weather.daily.precipitation_probability_max[i]||0}%</span>`;weekList.appendChild(article)}}
function renderWeeklyReport(weather){const temps=weather.daily.temperature_2m_max;const rainfall=weather.daily.precipitation_sum;const average=temps.reduce((sum,value)=>sum+value,0)/temps.length;const totalRain=rainfall.reduce((sum,value)=>sum+value,0);const rainyDays=rainfall.filter(value=>value>0).length;weeklyAverage.textContent=`${Math.round(average)}°C`;weeklyRainfall.textContent=`${totalRain.toFixed(1)} mm`;weeklyRainyDays.textContent=`${rainyDays} days`;weeklySunshine.textContent="N/A"}
function formatTime(time){if(!time)return"--";return new Date(time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
function addCityToList(list,city){const exists=list.some(item=>item.name.toLowerCase()===city.name.toLowerCase());if(!exists){list.push(city);saveState();renderLists()}}
function removeCityFromList(list,index){list.splice(index,1);saveState();renderLists()}
function renderLists(){favoriteList.innerHTML="";savedCityList.innerHTML="";if(!state.favorites.length){favoriteList.innerHTML="<li class=\"muted\">No favorite cities yet.</li>"}else{state.favorites.forEach((city,index)=>{const li=document.createElement("li");li.innerHTML=`<button class="city-button" type="button">${city.name}</button><button class="remove-button" type="button" aria-label="Remove ${city.name}">×</button>`;li.querySelector(".city-button").addEventListener("click",()=>loadSavedCity(city));li.querySelector(".remove-button").addEventListener("click",()=>removeCityFromList(state.favorites,index));favoriteList.appendChild(li)})}if(!state.savedCities.length){savedCityList.innerHTML="<li class=\"muted\">No saved cities yet.</li>"}else{state.savedCities.forEach((city,index)=>{const li=document.createElement("li");li.innerHTML=`<button class="city-button" type="button">${city.name}</button><button class="remove-button" type="button" aria-label="Remove ${city.name}">×</button>`;li.querySelector(".city-button").addEventListener("click",()=>loadSavedCity(city));li.querySelector(".remove-button").addEventListener("click",()=>removeCityFromList(state.savedCities,index));savedCityList.appendChild(li)})}}
async function loadSavedCity(city){state.location=city;saveState();searchStatus.textContent="Loading...";try{await fetchWeather(city.latitude,city.longitude,city.name,city.region||"",city.country||"");searchStatus.textContent=""}catch(error){searchStatus.textContent="Unable to load weather.";console.error(error)}}
addFavoriteButton.addEventListener("click",()=>{if(!state.location.name){searchStatus.textContent="Search for a city first.";return}addCityToList(state.favorites,{...state.location});searchStatus.textContent=`${state.location.name} added to favorites.`});
addSavedButton.addEventListener("click",()=>{if(!state.location.name){searchStatus.textContent="Search for a city first.";return}addCityToList(state.savedCities,{...state.location});searchStatus.textContent=`${state.location.name} saved.`});
clearFavorites.addEventListener("click",()=>{state.favorites=[];saveState();renderLists()});
clearSaved.addEventListener("click",()=>{state.savedCities=[];saveState();renderLists()});
previousHours.addEventListener("click",()=>{if(state.weather){hourlyStart=Math.max(0,hourlyStart-12);renderHourly(state.weather)}});
nextHours.addEventListener("click",()=>{if(state.weather){hourlyStart=Math.min(Math.max(0,state.weather.hourly.time.length-12),hourlyStart+12);renderHourly(state.weather)}});
const majorCities=[["Addis Ababa",8.9806,38.7578],["Dire Dawa",9.6009,41.8501],["Hawassa",7.0621,38.4764],["Bahir Dar",11.5742,37.3614],["Mekelle",13.4967,39.4767],["Jimma",7.6731,36.8344]];
function renderMajorCities(){citiesGrid.innerHTML="";majorCities.forEach(city=>{const article=document.createElement("article");article.innerHTML=`<h3>${city[0]}</h3><button class="ghost-btn full" type="button">View Weather</button>`;article.querySelector("button").addEventListener("click",()=>loadSavedCity({name:city[0],latitude:city[1],longitude:city[2],country:"Ethiopia"}));citiesGrid.appendChild(article)})}
async function initialize(){loadState();applyTheme();renderLists();renderMajorCities();try{await fetchWeather(state.location.latitude,state.location.longitude,state.location.name,state.location.region,state.location.country)}catch(error){console.error(error);searchStatus.textContent="Unable to load weather data."}}
initialize();