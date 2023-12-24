let appId = '02506ab6fba14fff4daa2bbadcb15323';
let units = 'metric';
let searchMethods = 'zip';

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethods = 'zip';
    }
    else
    searchMethods = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethods}=${searchTerm}&APPID=${appId}&units=${units}`).then( result => {
    return result.json();
}).then( result => {
   init(result);
})

}
function init(resultFromServer){
    console.log(resultFromServer);
   switch(resultFromServer.weather[0].main){
    case 'Clear':
        document.body.style.backgroundImage = 'url(clear.jpg)';
        break;

    case 'Clouds':
        document.body.style.backgroundImage = 'url(cloudy.jpg)';
        break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
        document.body.style.backgroundImage = 'url(rainy.jpg)';
        break;
    
    case 'Thunderstorm':
        document.body.style.backgroundImage = 'url(storm.jpg)';
        break;

    case 'Snow':
        document.body.style.backgroundImage = 'url(snow.jpg)';
        break;
    default:
        document.body.style.backgroundImage = 'url(default.jpg)';
        break;
   }

   let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
   let temperatureElement = document.getElementById('temperature');
   let humidityElement = document.getElementById('humidity');
   let windElement = document.getElementById('windSpeed');
   let cityHeader = document.getElementById('cityHeader');

   let weatherIcon = document.getElementById('documentIconImg');
   weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
   
 
   let resultDescription = resultFromServer.weather[0].description;
   weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
   temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
   windElement.innerHTML = 'Winds at  ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
   cityHeader.innerHTML = resultFromServer.name;
   humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity +  '%';

   setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
   let weatherContainer = document.getElementById('weatherContainer');
   let weatherContainerHeight = weatherContainer.clientHeight;
   let weatherContainerWidth = weatherContainer.clientWidth;

   weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
   weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
   weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
   let searchTerm = document.getElementById('searchInput').value;
   if(searchTerm)
       searchWeather(searchTerm);
});