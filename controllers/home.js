const Hotel = require('../models/Hotel')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const hotels = await Hotel.find()
            res.render('index.ejs', {hotels:hotels })
          } catch (err) {
            console.log(err)
          }
    }
}