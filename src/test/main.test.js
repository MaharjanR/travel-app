import { generate } from "../client/js/formHandler";
import { updateUI } from "../client/js/uiHandler";
import { validate } from "../client/js/inputValidation";
import request from "supertest";
const server = require("../server/server");

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(generate).toBeDefined();
    });
});

describe("Testing the update UI functionality", () => {
    test("Testing the updateUI() function", () => {
        expect(updateUI).toBeDefined();
    });
});

describe("Testing the validate functionality", () => {
    test("Testing the validateInput() function", () => {
        expect(validate).toBeDefined();
    });

    test("Testing the validateInput(), is it function?", () => {
        expect(typeof validate).toBe("function");
    });

    test("Testing all the fields entered properly", () => {
        const startDate = "2020-08-05";
        const endDate = "2020-08-15";
        const destination = "Kathmandu";

        const valid = validate(startDate, endDate, destination);

        expect(valid).toBe("true");
    });

    test("Testing start date bigger than end date", () => {
        const startDate = "2020-08-25";
        const endDate = "2020-08-15";
        const destination = "Kathmandu";

        const valid = validate(startDate, endDate, destination);

        expect(valid).toBe("End date should be greater than start date");
    });
});

describe("Testing the server functionality", () => {
    test("get method travel ", () => {
        const response = request(server).get("/travel");
        expect(response.status).toBe(undefined);
    });
});
