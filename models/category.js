const mongoose = require('mongoose');

// schema of category collection
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    image: String,
    description: {
        type: String,
        required: true
    },
    taxApplicability: {
        type: Boolean,
        default: false
    },
    tax: Number,
    taxType: String,
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
    }],

});

module.exports = mongoose.model('Category', categorySchema);