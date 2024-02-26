const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Hotel = require("../models/Hotel");

const api = supertest(app);

beforeEach(async () => {
  await Hotel.deleteMany({});
  await Hotel.insertMany(helper.initialHotels);
});

describe("when there is initially some notes saved", () => {
  test("hotels are returned as json", async () => {
    await api
      .get("/api/hotels")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all hotels are returned", async () => {
    const response = await api.get("/api/hotels");
    expect(response.body).toHaveLength(helper.initialHotels.length);
  });

  test("a specific hotel is within the returned hotels", async () => {
    const response = await api.get("/api/hotels");
    const contents = response.body.map((r) => r.name);
    expect(contents).toContain("Hotel Jane 2");
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const hotelAtStart = await helper.hotelInDB();
    const hotelToView = hotelAtStart[0];
    const result = await api
      .get(`/api/hotels/${hotelToView.id}`)
      .expext(200)
      .expect("Content-Type", /application\/json/);
    expect(result.body).toEqual(hotelToView);
  });

  test("fails with statuscode 404 if hotel does not exist", async () => {
    const validNonexistingId = await helper.nonexistingId();

    await api.get(`/api/hotels/${validNonexistingId.id}`).expext(200);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/hotels/${invalidId.id}`).expext(400);
  });
});

describe("addition of a new hotel", () => {
  test("succeds with valid data", async () => {
    const newHotel = {
      name: "Hotel Jane 3",
      type: "hotel",
      city: "london",
      address: "london, England",
      distance: "3.0",
      photo: ["img1.jpg", "img2.jpg"],
      title: "best hotel",
      desc: "best hotel in England with free wifi, and accomodation",
      rating: 5,
      cheapestPrice: 250,
      featured: true,
    };
    await api
      .post("/api/hotels")
      .send(newHotel)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const hotelAtEnd = await helper.hotelInDB();
    expect(hotelAtEnd).toHaveLength(helper.initialHotels.length + 1);

    const contents = hotelAtEnd.map((n) => n.name);
    expect(contents).toContain("Hotel Jane 3");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newHotel = {
      type: "hotel",
      city: "london",
      address: "london, England",
      distance: "3.0",
      photo: ["img1.jpg", "img2.jpg"],
      title: "best hotel",
      desc: "best hotel in England with free wifi, and accomodation",
      rating: 5,
      cheapestPrice: 250,
      featured: true,
    };
    await api.post("/api/hotels").send(newHotel).expect(400);

    const hotelAtEnd = await helper.hotelInDB();

    expect(hotelAtEnd).toHaveLength(helper.initialHotels.length);
  });
});

describe("deletion of a new hotel", () => {
  test("succeeds with satus code 204 if id is valid", async () => {
    const hotelAtStart = await helper.hotelInDB();
    const hotelToDelete = hotelAtStart[0];

    await api.delete(`/api/hotels/${hotelToDelete.id}`).expect(204);

    const hotelAtEnd = await helper.hotelInDB();
    expect(hotelAtEnd).toHaveLength(helper.initialHotels - 1);

    const contents = hotelAtEnd.map((r) => r.name);
    expect(contents).not.toContain(hotelToDelete.name);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
