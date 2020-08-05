const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

const app = express();
dotenv.config();

let projectData = {
    minTemp: "",
    maxTemp: "",
    temp: "",
    minFeelsLike: "",
    maxFeelsLike: "",
    countryCode: "",
    cityName: "",
    timezone: "",
    img: "",
    lengthOfTrip: "",
};

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("client"));

app.get("/", (req, res) => {
    console.log(projectData);
    console.log(projectData.img);
    res.send("Hellow");
});

// post route to save data in the projectData
app.post("/travel", async function (req, res) {
    try {
        // assigning the user inputs to its own variable
        const { startDate, endDate, destination } = req.body;
        let weatherbit;
        // targeting the days of date to get the difference
        const startDays = startDate.slice(8, 10);
        const endDays = endDate.slice(8, 10);
        const lengthOfTrip = endDays - startDays;

        // storing the difference in object
        projectData.lengthOfTrip = lengthOfTrip;

        // calling the api to get the lattitude and longitude and storing it for later use
        const geoLocation = await axios.get(
            `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.NAME}`
        );
        const { lat, lng } = geoLocation.data.geonames[0];

        // calling the api using lat and long to get the weather result of that area.
        weatherbit = await axios.get(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`
        );

        const weatherData = weatherbit.data;

        // storing the start date weather
        weatherData.data.forEach((val) => {
            if (val.valid_date == startDate) {
                projectData.minTemp = val.min_temp;
                projectData.maxTemp = val.max_temp;
                projectData.temp = val.temp;
                projectData.minFeelsLike = val.app_min_temp;
                projectData.maxFeelsLike = val.app_max_temp;
            } else return;
        });

        // storing the place name and the timezone
        projectData.countryCode = weatherData.country_code;
        projectData.cityName = weatherData.city_name;
        projectData.timezone = weatherData.timezone;

        // calling the api to get the picture of that area and storing it in the object
        pixabay = await axios.get(
            `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${destination}&image_type=photo`
        );

        const { webformatURL } = pixabay.data.hits[0];

        projectData.img = webformatURL;
        console.log("done");
        res.end();
    } catch (e) {
        console.log(e);
    }
});

// get route, sends the projectdata object
app.get("/travel", async (req, res) => {
    await res.send(projectData);
});

// setting up port
const port = 3000;

app.listen(port, () => console.log(`Server running in ${port} port`));

module.exports = app;
