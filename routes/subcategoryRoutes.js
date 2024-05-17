import express from 'express';
import Category from '../models/category.js';
import Subcategory from '../models/subcategory.js';

const router=express.Router();

router.post("/subcategories", async (req, res) => {
    try {
        const newsubCategory = new Subcategory(req.body);
        const savesubcategory = await newsubCategory.save();
        const categoryName = req.body.categoryName;
        const category = await Category.findOne({ categoryName: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        category.subCategories.push(savesubcategory); // push subcategory
        await category.save();
        res.status(201).json(savesubcategory);

    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
});

//Get request to get all subcategories
router.get("/subcategories", async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        if (!subcategories)
            return res.status(404).json({ message: 'no subcategories found' });
        res.status(201).json(subcategories);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// Get request to get all subcategories under a category
router.get("/subcategories/:categoryName", async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        console.log(categoryName);
        const category = await Category.findOne({ categoryName: categoryName }).populate('subCategories');
        console.log(category);
        if (!category)
            return res.status(404).json({ message: 'no such category found' });
        const subcategoires = category.subCategories;
        if (!subcategoires)
            return res.status(404).jspon({ message: 'no subcatgories found under the category' });
        res.status(201).json(subcategoires);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// get request to get a subcategory by its name
router.get("/subcategories/:subcategoryName", async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const subcategory = await Subcategory.findOne({ subcategoryName: subcategoryName });
        if (!subcategory)
            return res.status(404).json({ message: 'no such subcategory found' });
        res.status(201).json(subcategory);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

});

//patch request to update attributes of subcategory
router.patch("/subcategories/:subcategoryName", async (req, res) => {
    try {
        //console.log(req.body);
        const subcategoryName = req.params.subcategoryName;
        const updates = req.body;
        const updatedsubCategory = await Subcategory.findOneAndUpdate({ subcategoryName }, updates, { new: true });
        if (!updatedsubCategory)
            return res.status(404).json({ message: 'category not found' });
        res.status(201).json(updatedsubCategory);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;