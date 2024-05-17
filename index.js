import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Routes to Category, subcategory, item.
app.use(categoryRoutes);
app.use(subcategoryRoutes);
app.use(itemRoutes);

app.get("/", async (req, res) => {
    res.send("hello world");
});
//Connecting to the MongoDB 
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`sever working on port ${port}`);
    });
})
    .catch((error) => console.log("Error Connecting to MongoDB:", error));
