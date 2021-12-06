function loadFunction() {
  getWeather();
}
function render(dataObj) {
  const root = document.getElementById("root");
  root.insertAdjacentHTML(
    "beforeend",
    `
        <div class=>
            <h2>"Időjárás"</h2>
        </div>

        <div class=></div>
        <div class=></div>
        <div class=></div>
        `
  );
}

let city = "Paris";

async function getWeather() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=a1b06107fefa4c95a81102652210612&q=${city}&aqi=no`
  );
  const data = await response.json();
  useApiData(data);
}
function useApiData(data) {
  let dataObj = {
    city: data.location.name,
    temp: data.current.temp_c,
    sky: data.current.condition.text,
    hum: data.current.humidity,
  };
  console.log(dataObj);
  render(dataObj);
}
window.addEventListener("load", loadFunction());
