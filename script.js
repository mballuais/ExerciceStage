document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("meteo-form");
  const weatherInfo = document.getElementById("weather-info");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    const cityInput = document.getElementById("Ville");
    const cityName = cityInput.value.trim(); // Récupère le nom de la ville et supprime les espaces vides au début et à la fin

    if (cityName === "") {
      alert("Veuillez saisir le nom d'une ville."); // Affiche une alerte si aucun nom de ville n'est saisi
      return;
    }

    // URL de l'API météo (remplacez 'YOUR_API_KEY' par votre clé API)
    const apiKey = "ac74dab4c2ae2f6d02ed66de07cc0c28";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "La ville n'a pas été trouvée. Veuillez saisir un nom de ville valide."
          );
        }
        return response.json();
      })
      .then((data) => {
        // Récupère les informations météorologiques
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Affiche les informations météorologiques dans l'interface utilisateur
        weatherInfo.innerHTML = `
                    <h2>Conditions météorologiques à ${cityName}</h2>
                    <p>Température : ${temperature}°C</p>
                    <p>Ressenti : ${feelsLike}°C</p>
                    <p>Humidité : ${humidity}%</p>
                    <p>Vitesse du vent : ${windSpeed} m/s</p>
                `;
      })
      .catch((error) => {
        // Gère les erreurs d'API
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
      });
  });
});
