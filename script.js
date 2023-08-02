// "0ea61558bdb913d734d4f05c0f4302f6" dbb1e9b7c8bad902bd55c2a2689ca560
const apikey="0ea61558bdb913d734d4f05c0f4302f6"
const input=document.querySelector("#input")
const citytitle=document.querySelector(".citytitle")
const cityinfo=document.querySelector(".cityinfo")
const fivedaycontainer=document.querySelector(".fiveDayContainer")
const historysection=document.querySelector(".historySection")
function search(cityname){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apikey}`
    ).then(function (response){
        return response.json()
    }).then(function (data){
        const iconcode=data.weather[0].icon
    const iconlink=`https://openweathermap.org/img/w/${iconcode}.png`
console.log(data)
const currentcity=`
<h1>${data.name}</h1>


<img src="${iconlink}"/>
<p> ${data.weather[0].description}</p>
<p>temp: ${data.main.temp}</p>
<p>humidity: ${data.main.humidity}</p>
<p>windspeed: ${data.wind.speed}</p>
`
citytitle.innerHTML= currentcity
const lat=data.coord.lat
const lon=data.coord.lon

fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
).then(function(response){
    return response.json()
}).then(function (forecastdata){
    console.log(forecastdata,"datastuff")
    let fiveday=""
    


    let fivedayforecast=forecastdata.list
    
    for(var i=0;i<5;i++){
        console.log(fivedayforecast[i],"5day")
        const time=fivedayforecast[i].dt * 1000
        const currentdates=new Date(time).toLocaleDateString()
        const fivedayicon=fivedayforecast[i].weather[0].icon
        const fivedaylink=`https://openweathermap.org/img/w/${fivedayicon}.png`
         fiveday +=`
        <div class="fivedaycard">
        <p>${currentdates}</p>
        <div class="cardimage">
        <img src="${fivedaylink}"/>
        </div>
        <p> ${fivedayforecast[i].weather[0].description}</p>
    <p>temp: ${fivedayforecast[i].main.temp}</p>
    <p>humidity: ${fivedayforecast[i].main.humidity}</p>
    <p>windspeed: ${fivedayforecast[i].wind.speed}</p>
        
        </div>
        `
        fivedaycontainer.innerHTML=fiveday

    }


})
    })
}
function storecities(){
    let history=input.value.trim()
    let savedcities=JSON.parse(localStorage.getItem("savedcities"))||[]
    savedcities.push(history)
    localStorage.setItem("savedcities",JSON.stringify(savedcities))
    displaypastcities(savedcities)
}
function displaypastcities(savedcities){
    historysection.innerHTML=""
    savedcities.forEach(function(city){
        const citylist=document.createElement("li")
        citylist.textContent=city
        citylist.className+="past"
        historysection.appendChild(citylist)
        citylist.addEventListener("click",function(event){
            let previouscity=citylist.textContent
            search(previouscity)
        })

    })


}


const button=document.querySelector("#search-button")
button.addEventListener("click",function(event){
    event.preventDefault()
    storecities()
    let cityname=input.value.trim()
    search(cityname)
})