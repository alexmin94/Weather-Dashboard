const apikey="dbb601e9b7c8bad902bd55c2a2689ca5"
const input=document.querySelector("#input")
const citytitle=document.querySelector(".citytitle")
const cityinfo=document.querySelector(".cityinfo")

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
}).then(function (forcastdata){
    console.log(forcastdata,"datastuff")
    
})
    })
}


const button=document.querySelector("#search-button")
button.addEventListener("click",function(event){
    event.preventDefault()
    let cityname=input.value.trim()
    search(cityname)
})