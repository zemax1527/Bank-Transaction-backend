const app = require('./src/app')
require('dotenv').config()
const connectDb = require('./src/database/db.js')

connectDb()

app.listen( process.env.PORT, (req, res) =>{
    console.log("Server is started ")
})
