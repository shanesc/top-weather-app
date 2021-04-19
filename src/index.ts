const input: HTMLInputElement = document.querySelector('#location');
const form: HTMLFormElement = document.querySelector('form');
const unitBtns: HTMLCollectionOf<HTMLButtonElement> = document.querySelectorAll(
  '.btn--unit'
);

unitBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleActive(unitBtns);
    getAndFillWeather();
  });
});

function toggleActive(btns) {
  btns.forEach((btn) => {
    btn.classList.toggle('active');
  });
}

async function getData(url: string) {
  const response = await fetch(url);
  const data: Promise<any> = await response.json();
  return data;
}
interface Weather {
  name: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

async function getWeather(url: string) {
  const data = await getData(url);
  const weather: Weather = {
    name: data.name,
    currentTemp: data.main.temp,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
  return weather;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getAndFillWeather();
});

function fillWeather(data: Weather, unitConversionFunction) {
  const city: HTMLHeadingElement = document.querySelector('#city');
  const description: HTMLParagraphElement = document.querySelector(
    '#description'
  );
  const currentTemp: HTMLHeadingElement = document.querySelector(
    '#current-temp'
  );
  const highTemp: HTMLSpanElement = document.querySelector('#high-temp');
  const lowTemp: HTMLSpanElement = document.querySelector('#low-temp');
  const icon: HTMLSpanElement = document.querySelector('.owi');

  city.innerHTML = data.name;
  description.innerHTML = data.description;
  currentTemp.innerHTML =
    unitConversionFunction(data.currentTemp).toString() + '°';
  highTemp.innerHTML = unitConversionFunction(data.maxTemp).toString() + '°';
  lowTemp.innerHTML = unitConversionFunction(data.minTemp).toString() + '°';
  icon.className = `owi owi-${data.icon}`;
}

function convertKelvinToFahrenheit(temp: number) {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
}
function convertKelvinToCelcius(temp: number) {
  return Math.round(temp - 273.15);
}

function getAndFillWeather(location) {
  if (!location) {
    location = input.value;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bf0fa09fe343c1479619848701a568ed`;
  getWeather(url).then((data) => {
    const activeUnit: HTMLButtonElement = document.querySelector('.active');

    if (activeUnit.id === 'btn-celcius') {
      fillWeather(data, convertKelvinToCelcius);
    } else {
      fillWeather(data, convertKelvinToFahrenheit);
    }
  });
}

window.addEventListener('load', getAndFillWeather('Bristol'));
