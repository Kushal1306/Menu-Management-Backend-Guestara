import express from 'express';
import Item from '../models/item.js';
import Category from '../models/category.js';
import Subcategory from '../models/subcategory.js';

const router = express.Router();
//post request to insert and item into the collection
router.post("/items", async (req, res) => {
    try {
        const {
            itemName,
            image,
            categoryName,
            subcategoryName,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount
        } = req.body;
        const totalAmount = baseAmount - discount;

        if (!subcategoryName && !categoryName)
            return res.status(400).json({ message: 'Either subcategory or category should be filled' });

        let exists;
        if (subcategoryName) {
            exists = await Subcategory.findOne({ subcategoryName: subcategoryName });
        } else {
            exists = await Category.findOne({ categoryName: categoryName });
        }
        if (!exists)
            return res.status(404).json({ message: 'Subcategory or category not found' });

        const newItem = new Item({
            itemName,
            image,
            categoryName,
            subcategoryName,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount,
            totalAmount
        });

        const savedItem = await newItem.save();

        if (subcategoryName) {
            const subcategory = await Subcategory.findOne({ subcategoryName: subcategoryName });
            if (!subcategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            //we push the particular items into the subcategory
            subcategory.items.push(savedItem);
            await subcategory.save();
        }
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Get Request to retrieve all items
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        if (!items)
            return res.status(404).json({ message: 'Items not found' });
        res.status(201).json(items);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get Request to retrieve all items under a category 
router.get("/items/category/:categoryName", async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName: categoryName }).populate('subCategories');
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        console.log(category);
        const subcategories = category.subCategories;
        console.log(subcategories);
        if (!subcategories)
            return res.status(404).json({ message: 'No subcategories under categories' });

        /* A category can have subcategories which in turn can has multiples items
        below is the logic to retrieve those items which fall under a category */

        let allitems = [];
        for (const subcategory of subcategories) {
            const items = await Item.find({ subcategoryName: subcategory.subcategoryName });
            allitems.push(...items);
        }
        res.status(200).json(allitems);
        //console.log(subcategories);


    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

// Get Request to get items under a subcategory with the help of 'populate'
router.get("/items/subcategory/:subcategoryName", async (req, res) => {

    try {
        const subcategoryName = req.params.subcategoryName;
        const subcategory = await Subcategory.findOne({ subcategoryName }).populate('items');

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        const items = subcategory.items;
        res.status(200).json(items);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });

    }

});

//Api request search items by Name with partial match
router.get("/items/search", async (req, res) => {
    try {
        const partialName = req.query.name;
        console.log(partialName);
        // const items = await Item.find({ itemName: { $regex: partialName, $options: "i" } });
        const regexPattern = new RegExp(partialName, "i");

        // Finding items with partial match
        const items = await Item.find({ itemName: { $regex: regexPattern } });
        if (!items)
            return res.status(404).json({ message: "No items found" });
        res.status(201).json(items);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//getting item by ItemName
router.get("/items/:itemName", async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const items = await Item.findOne({ itemName: itemName });
        if (!items) {
            return res.status(404).json({ message: 'item not found' });
        }
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

//patch request to update attributes of an item
router.patch("/items/:itemName", async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const updates = req.body;
        let totalAmount;
        const itemData = await Item.findOne({ itemName });

        // we only need to handle the total amount because we calculate it based on basemount and discount, others all can be replaced
        if (updates.baseAmount && updates.discount) {
            totalAmount = updates.baseAmount - updates.discount;
            updates.totalAmount = totalAmount;
        } else if (updates.baseAmount || updates.discount) {
            totalAmount = (updates.baseAmount || itemData.baseAmount) - (updates.discount || itemData.discount);
            updates.totalAmount = totalAmount;
        }

        // 'findOneandUpdate' with updates, 'new' set to true replaces the attributes of the item mentioned by us in the body.
        const updatedItem = await Item.findOneAndUpdate({ itemName }, updates, { new: true });

        if (!updatedItem)
            return res.status(404).json({ message: 'Item not found' });

        res.status(200).json(updatedItem);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export default router;
