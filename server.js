require("dotenv").config()
const cors = require("cors");
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL_CLOUD, {useNewUrlParser: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const weaponsRouter = require('./routes/weapons.js')
app.use('/weapons', weaponsRouter)

app.listen(port, () => console.log("Server listening..."))