// const Hotel = require("../models/Hotel");
// const Room = require("../models/Room");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const config = {
  headers: {
    "X-RapidAPI-Key": process.env.RapidAPI_Key,
    "X-RapidAPI-Host": process.env.RapidAPI_Host,
  },
};
const d = new Date();
const year = d.getFullYear();
const mon = d.getMonth();
const day = d.getDate();

module.exports = {
  location: async (req, res) => {
    const city = req.params.city;
    const url = `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}&languagecode=en`;
    try {
      axios.get(url, config).then((response) => {
        res.json(response.data);
        console.log(response.data.length);
      });

      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      console.log(err);
    }
  },
  list: async (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    const url2 = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?arrival_date=${start}&departure_date=${end}&dest_ids=-3712125`;
    try {
      axios.get(url2, config).then((response) => {
        res.json(response.data);
        console.log(response.data.length);
      });

      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      console.log(err);
    }
  },
  rooms: async (req, res) => {
    const hotelId = req.params.hotelId;
    const url2 = `https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms?hotel_id=${hotelId}`;
    try {
      axios.get(url2, config).then((response) => {
        res.json(response.data);
        console.log(response.data.length);
      });

      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      console.log(err);
    }
  },
};
