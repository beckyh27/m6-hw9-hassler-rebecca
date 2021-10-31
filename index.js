// grab references to form, input, and #weather
var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var weatherEl = document.getElementById('weather')

formEl.onsubmit = function(e){
    e.preventDefault()
    var query = inputEl.value.trim()
    if (!query) return
    fetch('https://api.openweathermap.org/data/2.5/weather?appid=fe1a8ee3b8894757366a34ae524f361a&units=imperial&q=' + query)
    .then(function(response) {
        return response.json()
    })
    .then(function(resultingJSON) {
        renderWeather(resultingJSON)
        inputEl.value = ""
    })
    .catch(function(err){
        console.log(err)
    })
}

function renderWeather(weatherObj) {
    weatherEl.innerHTML = ""
    if (weatherObj.message) {
        weatherEl.textContent = 'Location not found'
        weatherEl.style = 'padding: 10px 0 30px; font-size: 1.6rem; font-weight: bold;'
        return
    }

    // city
    var city = document.createElement('h2')
    city.textContent = weatherObj.name + ", " + weatherObj.sys.country
    city.style = 'margin: 0; font-size: 1.6rem;'
    weatherEl.appendChild(city)

    // icon
    var icon = document.createElement('img')
    icon.src = 'http://openweathermap.org/img/wn/' + weatherObj.weather[0].icon + '@2x.png' 
    icon.alt = weatherObj.weather.icon
    weatherEl.appendChild(icon)

    // description
    var description = document.createElement('h3')
    description.textContent = weatherObj.weather[0].description
    description.style = 'font-weight: normal; font-size: 1.2rem; text-transform: capitalize; margin-top: 0;'
    weatherEl.appendChild(description)

    // current temp
    var currentTemp = document.createElement('h4')
    currentTemp.textContent = 'Current: ' + weatherObj.main.temp + '° F'
    currentTemp.style = 'font-weight: normal; font-size: 1.2rem; text-transform: capitalize; margin: 0;'
    weatherEl.appendChild(currentTemp)

    // feels like temp
    var feelsLike = document.createElement('h5')
    feelsLike.textContent = 'Feels like: ' + weatherObj.main.feels_like + '° F'
    feelsLike.style = 'font-weight: normal; font-size: 1.2rem; text-transform: capitalize; margin: 0; padding-bottom: 30px;'
    weatherEl.appendChild(feelsLike)

    // time last updated
    var timestamp = weatherObj.dt

    function formatAMPM(timestamp) {

        var date = new Date(timestamp * 1000)

        var hours = date.getHours()
        var minutes = date.getMinutes()

        var ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm

        return strTime
    }

    var lastUpdated = document.createElement('h6')
    lastUpdated.textContent = 'Last updated: ' + formatAMPM(timestamp) 
    lastUpdated.style = 'font-weight: normal; font-size: 1.2rem; margin: 0; padding-bottom: 30px;'
    weatherEl.appendChild(lastUpdated)

}
