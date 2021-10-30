// grab references to form, input, and #weather
var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var weatherEl = document.getElementById('weather')
console.log(formEl, inputEl, weatherEl)

formEl.onsubmit = function(e){
    e.preventDefault()
    var query = inputEl.value
    console.log(query)
    // fetch('api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=fe1a8ee3b8894757366a34ae524f361a')
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
    // if (weatherObj.message) {
    //     weatherEl.textContent = weatherObj.message
    //     return
    // }

    // city
    var city = document.createElement('h2')
    city.textContent = weatherObj.name + ", " + weatherObj.sys.country
    city.style = 'margin-bottom: 0; font-size: 1.6rem;'
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

}




// attach submit to form event
// fetch weather data if there is a query
// call render weather function

// formEl.onsubmit = function(e) {
//     e.preventDefault()
//     var query = inputEl.value.trim()
//     if (!query) return
//     console.log(query)
//     fetch('api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=fe1a8ee3b8894757366a34ae524f361a')
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(resultingJSON) {
//         renderWeather(resultingJSON)
//         inputEl.value = ""
        
//     })
//     .catch(function(err){
//         console.log(err)
//     })
// }

// function renderWeather(weatherObj) {
//     weatherEl.innerHTML = ""
//     if (weatherObj.Error) {
//         weatherEl.textContent = weatherObj.Error
//         return
//     }

//     console.log(weatherObj.weather.main)

    // // create title
    // var title = document.createElement('h2')
    // title.textContent = movieObj.Title + " (" + movieObj.Year + ")"
    // movieEl.appendChild(title)

    // // genre
    // var genreRuntime = document.createElement('h4')
    // genreRuntime.textContent = movieObj.Genre + " (" +  movieObj.Runtime + ")"
    // // genreRuntime.style.fontStyle = 'italic'
    // genreRuntime.style= 'font-style: italic;'
    // movieEl.appendChild(genreRuntime)

    // //poster
    // var poster = document.createElement('img')
    // poster.src = movieObj.Poster
    // poster.alt = movieObj.Poster + " poster"
    // movieEl.appendChild(poster)

    // //plot
    // var plot = document.createElement('p')
    // plot.textContent = movieObj.Plot
    // plot.style= 'font-style: italic;'
    // movieEl.appendChild(plot)
    // temp

    // //ratings
    // movieObj.Ratings.forEach(function(rating) {
    //     var ratingEl = document.createElement('h5')
    //     ratingEl.textContent = rating.Source + ": " + rating.Value
    //     movieEl.appendChild(ratingEl)
    // })
    
// }

// renderMovie function
// handle clearing previous movie
// handle movie not found
// render title, year, genre, runtime, poster, plot, and ratings