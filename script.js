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
        <div class="container">
            <ul class="cities"></ul>
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

  const root = document.getElementById("root");
  root.insertAdjacentHTML(
    "beforeend",
    `
        <div class="city">
            <h2>${cityData.city}</h2>
        </div>
        <div class="temp">
            <p>${cityData.temp}</p>
        </div>
        <div class="sky">
            <p>${cityData.sky}</p>
        </div>
        <div class="humidity">
            <p>${cityData.humidity}</p>
        </div>
        `
  );
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
