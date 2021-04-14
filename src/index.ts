const input: HTMLInputElement = document.querySelector('#location');
const form: HTMLFormElement = document.querySelector('form');

async function getData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getWeather(url) {
  interface Weather {
    temp: number;
    description: string;
  }
  const data = await getData(url);
  const weather: Weather = {
    temp: data.main.temp,
    description: data.weather[0].main
  };
  console.log(weather);
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bf0fa09fe343c1479619848701a568ed`;
  getWeather(url);
});
