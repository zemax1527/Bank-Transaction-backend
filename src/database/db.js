const mongoose = require('mongoose')

async function  connectDb(req, res) {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
         console.log('database connected successfully')
    })
    .catch(err=>{
        console.log("error connected to db")
        process.exit(1)
    })
    
}

module.exports = connectDb