const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Hotel = require("../models/Hotel");
const hotel = require("../controllers/hotel");

const api = supertest(app);

beforeEach(async () => {
  await Hotel.deleteMany({});
  const hotelObjects = helper.initialHotels.map((hotel) => new Hotel(hotel));
  const promiseArray = hotelObjects.map((hotel) => hotel.save());
  await Promise.all(promiseArray);
});

test("all hotels are returned", async () => {
  const responnse = await api.get("/api/hotels");
  expect(response.body).toHaveLength(helper.initialHotels.length);
});
test("a specific hotel is within the returned hotels", async () => {
  const responnse = await api.get("/api/hotels");
  const contents = response.body.map((r) => r.name);
  expect(contents).toContain("Hotel Jane 2");
});
test("a valid hotel can be added", async () => {
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

test("hotel without name is not added", async () => {
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

test("a specific hotel can be viewed", async () => {
  const hotelAtStart = await helper.hotelInDB();

  const hotelToView = hotelAtStart[0];
  const result = await api
    .get(`/api/hotels/find/${hotelToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(result.body).toEqual(hotelToView);
});

test("a hotel can be deleted", async () => {
  const hotelAtStart = await helper.hotelInDB();
  const hotelToDelete = hotelAtStart[0];

  await api.get(`/api/hotels/${hotelToDelete.id}`).expect(204);

  const hotelAtEnd = await helper.hotelInDB();
  expect(hotelAtEnd).toHaveLength(helper.initialHotels - 1);

  const contents = hotelAtEnd.map((r) => r.name);
  expect(contents).not.toContain(hotelToDelete.name);
});


afterAll(async () => {
  await mongoose.connection.close();
});
