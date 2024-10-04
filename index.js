const apiKey="ef2b3f7b868c7b8652074f6808e73538";
const weatherForm=document.getElementById("weatherForm");
const input=document.getElementById("input");
const submitButt=document.getElementById("submit");
const container=document.getElementById("infoContainer");


weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    let cityName=input.value;
    
    if(cityName){
        try{
            let data=await getWeather(cityName);
            displayWeather(data);
        }
        catch(error){
            displayErrorMessage(error);
        }
    }
    else{
        displayErrorMessage("Enter a city");
    }
    
});
async function getWeather(cityName){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    let response=await fetch(url);
    if(!response.ok){
        displayErrorMessage("Couldn't fetch the data");
    }
    return await response.json();
}
function displayWeather(data){
    let {name:city,main:{temp,humidity},weather:[{description,icon}]}=data;
    
    const cityName=document.createElement("p");
    const temperature=document.createElement("p");
    const humid=document.createElement("p");
    const desc=document.createElement("p");
    const weatherId=document.createElement("img");
    console.log(data);

    cityName.textContent=city;
    temperature.textContent=`${(temp-273.15).toFixed(1)}℃`;
    humid.textContent=`${humidity}%`;
    desc.textContent=description;
    //weatherId.textContent=getWeatherEmoji(id);
    weatherId.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;

    cityName.classList.add("cityName");
    temperature.classList.add("temperature");
    humid.classList.add("humidity");
    desc.classList.add("description");
    weatherId.classList.add("weatherIcon");

    container.textContent="";
    container.style.display="flex";
    container.appendChild(cityName);
    container.appendChild(temperature);
    container.appendChild(humid);
    container.appendChild(desc);
    container.appendChild(weatherId);
}

function displayErrorMessage(message){
    let errMessage=document.createElement("p");
    errMessage.textContent=message;
    errMessage.classList.add("errorMessage");
    container.textContent="";
    container.style.display='flex';
    container.appendChild(errMessage);
}