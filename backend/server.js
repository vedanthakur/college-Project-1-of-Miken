import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"


// app  config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();


app.get("/", (req,res)=> {
    res.send("API Working")
})


app.listen(port,()=>{
   console.log(`Server Started on http://localhost:${port}`) 

})


// mongodb+srv://miken:miken@cluster0.mme8db1.mongodb.net/?
