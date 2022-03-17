const ANIMATION_TIMER_INTERVAL_IN_SEC = 6;
let timer = null;

const getWeatherInfo = async (city) => {
  const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=10f171fe0e78477d942175423221703&q=${city}&aqi=no`

  const response = await fetch(weatherApiUrl);
  const data = await response.json();

  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition,
    humidity: data.current.humidity,
    dayNight: data.current.is_day,
    iconNum : data.current.condition.icon,
  }
}

const getCapitals = async () => {
  const capitalApiUrl = `https://countriesnow.space/api/v0.1/countries/capital`

  const response = await fetch(capitalApiUrl)
  const data = await response.json();  
  const capitals = data.data.map(x => x.capital).sort();
 
  return capitals
}

const getPexelsPhotos = async (selectedCity) => {
  const imagesData = await getPexelsCityImagesFromApi(selectedCity)
  return imagesData.photos.map(x => x.src.landscape)      
}

const getPexelsCityImagesFromApi = async (city) => {
    return await fetch(`https://api.pexels.com/v1/search?query=${city}`,{
            headers: {
                Authorization: "563492ad6f91700001000001f81c10909ede48159c8bb782f6f66418"
            }
    })
  .then(response => response.json())
}

const renderWeatherInfo = async (e) => {
  const root = document.getElementById("root");

  const selectedCity = e.target.value
  const weatherInfo = await getWeatherInfo(selectedCity);

  const cityImageUrls = await getPexelsPhotos(selectedCity);
  preloadImages(cityImageUrls)
  stopAnimation(timer);
  startAnimation(cityImageUrls)
  
  const widgetElement = document.querySelector(".widget");
  if (widgetElement) {
    widgetElement.remove();
  }

  let picRender = getPictureUrl(weatherInfo);  
  let fahrenheit = Math.round(weatherInfo.temperature * 1.8 + 32);

  root.insertAdjacentHTML("beforeend",
   `
      <article class="widget">
        <div class="weatherIcon">            
          <div class="condition-icon">
            <img src="${picRender}" />
          </div>
          <div class="description">
            <div class="weatherCondition">${weatherInfo.condition.text}
            </div> 
          </div>                
          </div>
          <div class="temperature">
            <span>${weatherInfo.temperature}&degC</span>
          </div>
          <div class="fahrenheit">
            <span>${fahrenheit}&degF</span>
          </div> 
          <div class="weatherInfo">
            <div>
              <span class="humidity-info">${weatherInfo.humidity}</span>
            </div>
            <i class="wi wi-humidity"></i>      
          </div>
          <div class="date">
              ${(new Date()).toLocaleDateString('hu-HU')} 
          </div>
        </article>
    `
      ) 
}

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

const getPictureUrl = (weatherInfo) => {
  let picName = "";
  if(weatherInfo.dayNight === 1){
    dayPart = "day"; 
    picName = weatherInfo.iconNum.substr(39,7);
    }
    else{
      dayPart = "night";
      picName = weatherInfo.iconNum.substr(41,7);
    }
    picRender = "weatherSymbols/"+dayPart+"/"+picName;

  return picRender;
}

const changeImageBackground = (x, images, defaultImageUrl) => {
    document.body.style.backgroundImage = `url(${images.length == 0 ? defaultImageUrl : images[x]})`;
    document.body.style.backgroundSize = "100% 100%";
}

const startBackgroundAnimationTimer = (images) => {
    const defaultImageUrl = `./vihar1.jpg)`;    

    let index = 0;
  
    changeImageBackground(index, images, defaultImageUrl);
  
    timer = setInterval(() => 
    {
        index = index + 1 >= images.length ? 0 : index + 1;
        changeImageBackground(index, images, defaultImageUrl);
    },
    ANIMATION_TIMER_INTERVAL_IN_SEC * 1000);
}

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
    return img
}

const preloadImages = (imageUrls) => {
    const images = []

    for (var i = 0; i < imageUrls.length; i++) {
      images[i] = preloadImage(imageUrls[i])
    }

    return images
}

const startAnimation = (imageUrls) => {
    startBackgroundAnimationTimer(imageUrls);
}

const stopAnimation = (timerFunction) => {
    if(timerFunction == null)
      return;

    clearInterval(timerFunction);
}

window.addEventListener("load", renderCapitals);
