const cloudinary = require("../middleware/cloudinary");
const Tour = require('../models/Tour')

module.exports = {
    createTour: async (req,res)=>{
        const newTour = new Tour(req.body)
        try{
            const savedTour = await newTour.save()
            res.status(200).json(savedTour)

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    },
    updateTour: async (req,res)=>{
        try{
            const updateTour = await Tour.findOneAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updateTour)

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    },
    deleteTour: async (req,res)=>{
        try{
            await Tour.findOneAndDelete(req.params.id)
            res.status(200).json("Hotel has been deleted")

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    },
    getTour: async (req,res)=>{
        try{
            const tour = await Tour.findById(req.params.id)
            res.status(200).json(tour)

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    },
    getTours: async (req,res)=>{
        try{
            const tours = await Tour.find()
            res.render('tour.ejs', {tours})
            res.status(200).json(tours)

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    }
}    