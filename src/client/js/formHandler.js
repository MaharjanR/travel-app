export async function generate(e) {
    e.preventDefault();

    // set up validation and error
    let validation;
    let errors = false;
    // targeting all the input elements value
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const destination = document.getElementById("destination").value;

    // validating the input fields and storing the response
    validation = Client.validate(startDate, endDate, destination);

    // if no errors, call the server and fetch API
    if (validation === "true") {
        // storing the user inputs value to object in order to change it to json and fetch api
        const inputs = {
            startDate: startDate,
            endDate: endDate,
            destination,
        };

        // calling the post method and passing the variables to be stored
        await fetch("http://localhost:3000/travel", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });

        // calling the get method to bring API data
        const apiDataJson = await fetch("http://localhost:3000/travel");
        const apiData = await apiDataJson.json();

        // displaying the data api
        Client.updateUI(apiData, errors);
    } else {
        // displaying error message
        errors = true;
        Client.updateUI(validation, errors);
    }
}
