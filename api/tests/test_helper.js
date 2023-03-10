const Hotel = require("../models/Hotel");

const initialHotels = [
    {
      name: "Hotel Jane",
      type: "hotel",
      city: "berlin",
      address: "berlin, Germany",
      distance: "5.0",
      photo: ["img1.jpg", "img2.jpg"],
      title: "best hotel",
      desc: "best hotel in Germany with free wifi, and accomodation",
      rating: 4,
      cheapestPrice: 100,
      featured: true,
    },
    {
      name: "Hotel Jane 2",
      type: "hotel",
      city: "msdrid",
      address: "madrid, Spain",
      distance: "5.0",
      photo: ["img1.jpg", "img2.jpg"],
      title: "best hotel",
      desc: "best hotel in Spain with free wifi, and accomodation",
      rating: 5,
      cheapestPrice: 200,
      featured: false,
    },
  ];

  const nonExistingId = async () => {
    const hotel = new Hotel({name: "willremobve Soon"})
    await hotel.save();
    await Hotel.remove();

    return hotel._id.toString()
  }

  const hotelInDB = async () => {
    const hotels = await Hotel.find({});
    return hotels.map(hotel => hotel.toJSON())
  }

module.exports = {
    initialHotels,
    nonExistingId,
    hotelInDB
}