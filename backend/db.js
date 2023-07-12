const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://admin:admin@inotebook.2nlrgxk.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected to mongo")
}

module.exports =  connectToMongo;


// mongodb+srv://bhavesh:bhavesh12345@cluster0.ck26fwh.mongodb.net/?retryWrites=true&w=majority