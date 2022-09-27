const Booknow = require('../models/Booknow')

module.exports = {
    getBooknow: async (req,res)=>{
        console.log(req.user)
        try{
            const BooknowItems = await Booknow.find({userId:req.user.id})
            res.render('booknow.ejs', {booknow: BooknowItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBooknow: async (req, res)=>{
        try{
            await Booknow.create({booknow: req.body.BooknowItem,userId: req.user.id})
            console.log('Booknow has been added!')
            res.redirect('/Booknow')
        }catch(err){
            console.log(err)
        }
    },
    addBooknow: async (req, res)=>{
        try{
            await Booknow.findOneAndUpdate({_id:req.body.BooknowIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    subBooknow: async (req, res)=>{
        try{
            await Booknow.findOneAndUpdate({_id:req.body.BooknowIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteBooknow: async (req, res)=>{
        console.log(req.body.BooknowIdFromJSFile)
        try{
            await Booknow.findOneAndDelete({_id:req.body.BooknowIdFromJSFile})
            console.log('Deleted Booknow')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    