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
app.post("/travel", async (req, res) => {
    projectData = {
        minTemp: 18.9,
        maxTemp: 25.8,
        temp: 20.7,
        minFeelsLike: 20.2,
        maxFeelsLike: 22.2,
        countryCode: "NP",
        cityName: "Kathmandu",
        timezone: "Asia/Kathmandu",
        img:
            "https://pixabay.com/photos/people-portrait-man-kathmandu-5321914/",
    };
    // try {
    //     const { date, destination } = req.body;
    //     let weatherbit;
    //     const geoLocation = await axios.get(
    //         `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.NAME}`
    //     );
    //     const { lat, lng } = geoLocation.data.geonames[0];

    //     weatherbit = await axios.get(
    //         `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`
    //     );

    //     const weatherData = weatherbit.data;

    //     weatherData.data.forEach((val) => {
    //         if ((val.valid_date = date)) {
    //             projectData.minTemp = val.min_temp;
    //             projectData.maxTemp = val.max_temp;
    //             projectData.temp = val.temp;
    //             projectData.minFeelsLike = val.app_min_temp;
    //             projectData.maxFeelsLike = val.app_max_temp;
    //         } else return;
    //     });

    //     projectData.countryCode = weatherData.country_code;
    //     projectData.cityName = weatherData.city_name;
    //     projectData.timezone = weatherData.timezone;

    //     pixabay = await axios.get(
    //         `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${destination}&image_type=photo`
    //     );

    //     const { pageURL } = pixabay.data.hits[0];

    //     projectData.img = pageURL;
    //     console.log("done");
    res.end();
    // } catch (e) {
    //     console.log(e);
    // }
});

// get route, sends the projectdata object
app.get("/travel", async (req, res) => {
    console.log(projectData);
    await res.send(projectData);
});

// setting up port
const port = 3000;

app.listen(port, () => console.log(`Server running in ${port} port`));
