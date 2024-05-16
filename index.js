const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./db')
const dotenv=require('dotenv');

const categoryRoutes=require('./routes/categoryRoutes');
const subcategoryRoutes=require('./routes/subcategoryRoutes');
const itemRoutes=require('./routes/itemRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Routes to Category, subcategory, item.
app.use(categoryRoutes);
app.use(subcategoryRoutes);
app.use(itemRoutes);

//Connecting to the MongoDB 
connectToDB().then(()=>{
    app.listen(port, () => {
        console.log(`sever working on port ${port}`);
    });
})
.catch((error)=> console.log("Error Connecting to MongoDB:",error));
