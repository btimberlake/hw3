let updateWidget = function(data) {
// API key:  5bcfde2f59c173eabef1748458723328
// Login:  bobbyt

  console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE
  currentTemp = data.main.temp
  currentTemp = Math.round(currentTemp)
  console.log(currentTemp)
  currentWeather = data.weather[0].main
  console.log(currentWeather)
  currentIcon = data.weather[0].icon
  console.log(currentIcon)
  currentURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  console.log(currentURL)
  currentCity = data.name
  console.log(currentCity)
  currentCtry = data.sys.country
  console.log(currentCtry)

  tempString1 = "It is " + currentTemp + " degrees outside."
  tempString2 = "Weather is:  " + currentWeather
  $(".card-text").html(tempString1 + "<br>" + tempString2)
  $(".card-img-top").attr("src", currentURL)
  $(".card-title").html(currentCity + ", " + currentCtry)
}

let updateWidget2 = function(data) {
  console.log("Got ANTIPODE data: ", data)

  currentTemp = data.main.temp
  currentTemp = Math.round(currentTemp)
  console.log(currentTemp)
  currentWeather = data.weather[0].main
  console.log(currentWeather)
  currentIcon = data.weather[0].icon
  console.log(currentIcon)
  currentURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  console.log(currentURL)

  currentCity = data.name
  console.log(currentCity)
  currentCtry = data.sys.country
  console.log(currentCtry)

  tempString1 = "It is " + currentTemp + " degrees here."
  tempString2 = "Weather is:  " + currentWeather
  $(".card-text2").html(tempString1 + "<br>" + tempString2)
  $(".card-img-bottom").attr("src", currentURL)
  if (currentCity != "" && currentCtry != undefined) {
    $(".card-title2").html("ANTIPODE is: " + currentCity + ", " + currentCtry)
  } else {
    $(".card-title2").html("ANTIPODE is in the ocean.")
  }
}

let getWeather = function(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(testFunc)
}

let testFunc = function(info) {
  // let latitude2 = '48.8566';
  // let longitude2 = '2.3522';
  let latitude2 = info.coords.latitude.toFixed(6)
  let longitude2 = info.coords.longitude.toFixed(6)
  // calculate Antipode
  let latAnti = -latitude2
  let longAnti = -Math.sign(longitude2)*(180 - Math.abs(longitude2))
  // let latitude2 = 30
  // let longitude2 = -85
  console.log("Latitude: " + latitude2)
  console.log("Longitude: " + longitude2)
  console.log("Anti Lat: " + latAnti)
  console.log("Anti Long: " + longAnti)

  let apiKey = '5bcfde2f59c173eabef1748458723328';
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude2
  weatherServiceURL += '&lon=' + longitude2
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  let weatherServiceURL2 = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL2 += 'lat=' + latAnti
  weatherServiceURL2 += '&lon=' + longAnti
  weatherServiceURL2 +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
  fetch(weatherServiceURL2).then(convertToJSON).then(updateWidget2).catch(displayError);
}

////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
// listener
$("#get_forecast").on("click", getWeather)
