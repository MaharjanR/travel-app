export const generate = async (e) => {
    e.preventDefault();

    let validation;
    const startDate = document.getElementById("start-date").value;
    const destination = document.getElementById("destination").value;

    validation = Client.validate(startDate, destination);

    if (validation) {
        const inputs = {
            date: startDate,
            destination,
        };

        await fetch("http://localhost:3000/travel", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });

        const apiDataJson = await fetch("http://localhost:3000/travel");
        const apiData = await apiDataJson.json();

        Client.updateUI(apiData);
    }
};
