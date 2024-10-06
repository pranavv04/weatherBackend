const express = require('express')
const app = express();

require('dotenv').config();
app.use(express.json())
const axios = require('axios')

const Key = process.env.KEY;

let location = ''
app.post('/' , (req,res)=>{
    try {
        const {location : response} = req.body;
        if(!response){
            res.status(404).json({error: "Location is not set"})
        }
        location = response;
        console.log(location)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Internal server error"})
    }
})


app.get('/' , async(req,res)=>{
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${Key}&q=${location}`;
        const response = await axios.get(url)
        if(!response){
            res.status(404).json({error : "Location error"})
        }
        res.status(200).json(response.data)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Internal server error"})
    }
})


app.listen(4000 , () => console.log('Server running'))