export const updateUI = (data) => {
    console.log(data);
    const travelContainer = document.getElementById("travel-container");

    const div = document.createElement("div");
    div.classList.add("container");
    const weatherData = `
        <div class="img-container">
        <img src="${data.img}" alt="location-img" class="destination" />
        </div>
        <div class="info">
            <h2>${data.cityName}, ${data.countryCode}</h2>
            <p><b>Timezone</b>: ${data.timezone}</p>
            <p>Max Temperature: ${data.maxTemp}</p>
            <p>Min Temperature: ${data.minTemp}</p>
            <p>Max Feels Like Temperature: ${data.minFeelsLike}</p>
            <p>Min Feels Like Temperature: ${data.maxFeelsLike}</p>
            <p>Average Temperature: ${data.temp}</p>
        </div>
    `;
    div.innerHTML = weatherData;
    travelContainer.appendChild(div);
};
