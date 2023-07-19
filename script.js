const apikey="dbb601e9b7c8bad902bd55c2a2689ca5"
const input=document.querySelector("#input")
const citytitle=document.querySelector(".citytitle")
const cityinfo=document.querySelector(".cityinfo")
const fivedaycontainer=document.querySelector(".fiveDayContainer")

function search(cityname){
    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`
    ).then(function (response){
        return response.json()
    }).then(function (data){
console.log(data)
const currentcity=`
<h1>${data[0].name}</h1>
<h1>${data[0].state}</h1>
`
citytitle.innerHTML= currentcity
const lat=data[0].lat
const lon=data[0].lon

fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`
).then(function(response){
    return response.json()
}).then(function (forecastdata){
    console.log(forecastdata,"datastuff")
    let fiveday=""
    const iconcode=forecastdata.current.weather[0].icon
    const iconlink=`https://openweathermap.org/img/w/${iconcode}.png`

    const currentWeather=`
    <div>
    <img src="${iconlink}"/>
    <p> ${forecastdata.current.weather[0].description}</p>
    <p>temp: ${forecastdata.current.temp}</p>
    <p>humidity: ${forecastdata.current.humidity}</p>
    <p>windspeed: ${forecastdata.current.wind_speed}</p>
    </div>


    `

    cityinfo.innerHTML=currentWeather


    let fivedayforecast=forecastdata.daily
    
    for(var i=0;i<5;i++){
        console.log(fivedayforecast[i],"5day")
        const time=fivedayforecast[i].dt * 1000
        const currentdates=new Date(time).toLocaleDateString()
        const fivedayicon=fivedayforecast[i].weather[0].icon
        const fivedaylink=`https://openweathermap.org/img/w/${fivedayicon}.png`
         fiveday +=`
        <div>
        <p>${currentdates}</p>
        <div class="cardimage">
        <img src="${fivedaylink}"/>
        </div>
        <p> ${fivedayforecast[i].weather[0].description}</p>
    <p>temp: ${fivedayforecast[i].temp.day}</p>
    <p>humidity: ${fivedayforecast[i].humidity}</p>
    <p>windspeed: ${fivedayforecast[i].wind_speed}</p>
        
        </div>
        `
        fivedaycontainer.innerHTML=fiveday

    }


})
    })
}


const button=document.querySelector("#search-button")
button.addEventListener("click",function(event){
    event.preventDefault()
    let cityname=input.value.trim()
    search(cityname)
})