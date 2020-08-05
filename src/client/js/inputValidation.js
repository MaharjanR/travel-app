export const validate = (startDate, endDate, destination) => {
    // check if any of the inputs fields are empty
    if ((startDate === "", endDate === "" || destination == "")) {
        return "All inputs are required";
    }
    // checks if destination has length greater than 3
    else if (destination.length < 3) {
        return "Destination must be greater than 3";
    }
    // checks if start date is smaller than end date else throw error
    else if (startDate > endDate) {
        return "End date should be greater than start date";
    } else {
        return "true";
    }
};
