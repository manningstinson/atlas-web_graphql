const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the project schema
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    // Add timestamps for when documents are created and modified
    timestamps: true
});

// Create and export the Project model
module.exports = mongoose.model('Project', projectSchema);