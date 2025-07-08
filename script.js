const apiKey = "f28dd8483d02fd1c3e398e48e47f3546"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function updateBackground(weather) {
  const body = document.body;
  body.style.transition = "background-image 0.5s ease-in-out";

  switch (weather) {
    case "Clear":
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')";
      break;
    case "Clouds":
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1350&q=80')";
      break;
    case "Rain":
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1350&q=80')";
      break;
    case "Drizzle":
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1609921212029-2ac5c3e679a5?auto=format&fit=crop&w=1350&q=80')";
      break;
    case "Mist":
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1350&q=80')";
      break;
    default:
      body.style.backgroundImage = "url('https://images.unsplash.com/photo-1549887534-3b5d6f30c94c?auto=format&fit=crop&w=1350&q=80')";
  }
}

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/default.png";
    }

    updateBackground(data.weather[0].main);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Fetch error:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// ✅ Automatically show default city on page load
window.addEventListener("load", () => {
  checkWeather("Delhi");
});
