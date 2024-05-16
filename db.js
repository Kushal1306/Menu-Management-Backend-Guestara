const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const url = process.env.url;

//Connecting to the database

async function connectToDB(){
    try {
        await  mongoose.connect(url);
        console.log("connected");
        
    } catch (error) {
        console.error('Error connecting to Database',error)
    }

};

module.exports=connectToDB;