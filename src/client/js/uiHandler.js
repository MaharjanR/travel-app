export const updateUI = (data, errors) => {
    // Gets the travel-result div and sets it value to none
    const travelResult = document.getElementById("travel-result");
    travelResult.innerHTML = "";
    const errorContainer = document.getElementById("errors");

    // checks if error occured on validation, if yes then display errors
    if (errors) {
        errorContainer.innerHTML = `
            <p class="errors">${data}</p>
        `;
    } else {
        // targeting errors div to remove the error
        const errorsDiv = document.getElementById("errors");
        if (errorsDiv) {
            errorsDiv.innerHTML = "";
        }

        // creating the div and displaying the API data
        const div = document.createElement("div");
        div.classList.add("container");
        const weatherData = `
            <div class="travel-container">
                <div class="img-container">
                    <img src="${data.img}" alt="location-img" class="destination" crossorigin="anonymous" />
                </div>
                <div class="info">
                    <h2>${data.cityName}, ${data.countryCode}</h2>
                    <p><b>Timezone</b>: ${data.timezone}</p>
                    <p>Max Temperature: ${data.maxTemp}&#8451</p>
                    <p>Min Temperature: ${data.minTemp}&#8451</p>
                    <p>Max Feels Like Temperature: ${data.minFeelsLike}&#8451</p>
                    <p>Min Feels Like Temperature: ${data.maxFeelsLike}&#8451</p>
                    <p>Average Temperature: ${data.temp}&#8451</p>
                    <p>The length of trip is: ${data.lengthOfTrip} days!!</p>
                </div>
            </div>
        `;
        div.innerHTML = weatherData;
        travelResult.appendChild(div);
    }
};
