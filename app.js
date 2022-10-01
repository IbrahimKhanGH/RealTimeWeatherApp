const iconElement = document.querySelector(".weather-icon")
const locationIcon = document.querySelector(".location-icon")
const tempElement = document.querySelector(".temprature-value p")
const descElement = document.querySelector(".temprature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

var input = document.getElementById("search")
let city = ""
let latitude = 0.0
let longitude = 0.0

input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();

        city = input.value 
        getSearchWeather(city)
        console.log(city)
    }
})
const weather ={}

weather.temprature ={
    unit: "farenheit"
}

const KELVIN =273

const key = '8d66202e3f82c669e2538c25f97bffce'

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} 
else{
    notificationElement.style.display ='block'
    notificationElement.innerHTML ='<p> Browser doesnt support geolocation'
}

function setPosition(position) {
    latitude =position.coords.latitude
    longitude =position.coords.longitude

    getWeather(latitude, longitude)
}
locationIcon.addEventListener("click",function(event){
    console.log('hey')
    getWeather(latitude,longitude)
})

function showError(error){
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<p> ${error.message} </p`
}
function getSearchWeather(city){
    let api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    

    fetch(api)
    .then(function (response){
        let data= response.json()
        return data
    })
    .then(function (data) {
        weather.temprature.value=Math.floor(1.8*(data.main.temp -KELVIN)+32)
        weather.description=data.weather[0].description
        weather.iconID= data.weather[0].icon
        weather.city= data.name 
        weather.country= data.sys.country
    })
    .then (function() {
        displayWeather()
    })
}

function getWeather(latitude,longitude){
    let api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    
    fetch(api)
    .then(function (response){
        let data= response.json()
        return data
    })
    .then(function (data) {
        weather.temprature.value=Math.floor(1.8*(data.main.temp -KELVIN)+32)
        weather.description=data.weather[0].description
        weather.iconID= data.weather[0].icon
        weather.city= data.name 
        weather.country= data.sys.country
    })
    .then (function() {
        displayWeather()
    })
}

function displayWeather() {
    iconElement.innerHTML='<img src="icons/' + weather.iconID + '.png">';
    tempElement.innerHTML=`${weather.temprature.value} °<span>F</span>`
    descElement.innerHTML=weather.description
    locationElement.innerHTML=`${weather.city}, ${weather.country}`
}
