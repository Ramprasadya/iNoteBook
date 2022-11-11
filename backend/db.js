const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook"

const conectToMongoose =()=>{
    mongoose.connect(mongoURI , ()=>{
        console.log("connected to mongoose successfully")
    }
    )
}

module.exports = conectToMongoose