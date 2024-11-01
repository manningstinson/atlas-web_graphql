const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Project schema
const projectSchema = new Schema({
    title: {
        type: String,
        required: true // Title is required
    },
    weight: {
        type: Number,
        required: true // Weight is required (this could represent project size or importance)
    },
    description: {
        type: String,
        required: true // Description is required
    }
});

// Export the Project model
module.exports = mongoose.model('Project', projectSchema);
