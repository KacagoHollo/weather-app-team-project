function skyConditions(data) {
  /*
  if data = "sunny" akkor legyen sunny.png
  */
}

function loadFunction() {
  const root = document.getElementById("root");
  root.insertAdjacentHTML(
    "afterbegin",
    `
    <section class="top-banner">
        <div class="container">
            <h1 class="heading">Simple Weather App</h1>
            <form class="ASD">
                <input type="text" placeholder="Search for a city" list="cityname" autofocus />
                <datalist id="cityname">
                    <option value="Boston"></option>
                    <option value="London"></option>
                    <option value="Paris"></option>
                    <option value="Budapest"></option>
                    <option value="Sydney"></option>
                </datalist>
            </form>
        </div>
    </section>
    <section class="ajax-section">
      <div class="city">
        <h2></h2>
      </div>
      <div class="temp">
        <p></p>
      </div>
      <div class="sky">
        <img>
        <p></p>
      </div>
      <div class="humidity">
        <p></p>
      </div>
    </section>
  `
  );

  const input = document.querySelector("input");
  input.addEventListener("change", render);
}

async function render(event) {
  event.preventDefault();
  event.stopPropagation();
  const cityData = await getWeather(event.target.value);
  // kesobb const skySource = skyConditions(cityData.sky);
  let sky = cityData.sky;
  console.log(sky);
  let pic = "";
  console.log(skyData[0].day, typeof(skyData[0].day), sky, typeof(sky));
  for (i=0; i< skyData.length; i++){
    if(skyData[i].day === sky){
      console.log("Itt vagyok");
      pic=skyData[i].icon;
    }
    console.log(pic);
  }


  document.querySelector(".city h2").innerHTML = cityData.city;
  document.querySelector(".temp p").innerHTML = cityData.temp;
  document.querySelector(".sky p").innerHTML = cityData.sky;
  // kesobb document.querySelector(".sky img").setAttribute("src", skySource);
  document.querySelector(".humidity p").innerHTML = cityData.humidity;
}

async function getWeather(selectedCity) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=a1b06107fefa4c95a81102652210612&q=${selectedCity}&aqi=no`
  );
  const data = await response.json();
  let dataObj = {
    city: data.location.name,
    temp: data.current.temp_c,
    sky: data.current.condition.text,
    humidity: data.current.humidity,
  };
  return dataObj;
}

window.addEventListener("load", loadFunction);
