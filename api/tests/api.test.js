const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("api are returned as json", async () => {
    await api.get("/api/hotels").expect(200).expect("Content-Type", /application\/json/)
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})