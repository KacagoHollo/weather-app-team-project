const getWeatherInfo = async (city) => {
  const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=a1b06107fefa4c95a81102652210612&q=${city}&aqi=no`

  const response = await fetch(weatherApiUrl);
  const data = await response.json();

  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition,
    humidity: data.current.humidity,
    dayNight: data.current.is_day,
  }
}

const getCapitals = async () => {
  const capitalApiUrl = `https://countriesnow.space/api/v0.1/countries/capital`

  const response = await fetch(capitalApiUrl)
  const data = await response.json();  
  const capitals = data.data.map(x => x.capital).sort();
 
  return capitals
}

const renderWeatherInfo = async (e) => {
  const root = document.getElementById("root");

  const selectedCity = e.target.value
  const weatherInfo = await getWeatherInfo(selectedCity);

  const widgetElement = document.querySelector(".widget");
  if (widgetElement) {
    widgetElement.remove();
  }
  let fahrenheit = Math.round(weatherInfo.temperature * 1.8 + 32);
  // console.log(fahrenheit);

  //<img src="weatherSymbols/day/${}.png">
  root.insertAdjacentHTML("beforeend",
   `
      <article class="widget">
          <div class="weatherIcon">            
            <div class="condition-icon">
              <img src="${weatherInfo.condition.icon}" />
            </div>
            <div class="description">
                <div class="weatherCondition">${weatherInfo.condition.text}</div> 
                </div>                
                </div>
                <div class="temperature">
                <span>${weatherInfo.temperature}&degC</span>
                </div>
                <div class="weatherInfo">
                <div>
                <span class="humidity-info">${weatherInfo.humidity}</span>
                <i class="wi wi-humidity"></i>
                <div class="place">${weatherInfo.city}</div>          
            </div>
          </div>
          <div class="date">
              ${(new Date()).toLocaleDateString('hu-HU')} 
          </div>
      </article>
    `
      ) 
}
// / ${fahrenheit}&degF


const renderCapitals = async () => {
  const capitals = await getCapitals();
  const capitalOptionList = capitals.map(capital => `<option value="${capital}"></option>`).join("");

  const root = document.getElementById("root");

  root.insertAdjacentHTML("beforeend", 
    `<div id="card">
      <section class="top-banner">
          <div class="container">
            <h1 class="heading">Weather</h1>
            <form class="cities">
                <input id="cities" type="text" placeholder="Search for a city" list="cityname" autofocus />
                <datalist id="cityname">${capitalOptionList}</datalist>
            </form>
          </div>
      </section>
    </div>
    `
  )
  
  const citiesInputElement = document.querySelector("input#cities");
  citiesInputElement.addEventListener("change", renderWeatherInfo)
}

window.addEventListener("load", renderCapitals);