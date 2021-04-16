const input: HTMLInputElement = document.querySelector('#location');
const form: HTMLFormElement = document.querySelector('form');

async function getData(url: string) {
  const response = await fetch(url);
  const data: Promise<any> = await response.json();
  return data;
}

async function getWeather(url: string) {
  interface Weather {
    name: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    description: string;
    icon: string;
  }
  const data = await getData(url);
  const weather: Weather = {
    name: data.name,
    currentTemp: data.main.temp,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
  console.log(data);
  console.log(weather);
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;
  // const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=bf0fa09fe343c1479619848701a568ed`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bf0fa09fe343c1479619848701a568ed`;
  getWeather(url);
});
