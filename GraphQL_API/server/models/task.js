const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Task schema
const taskSchema = new Schema({
    title: {
        type: String,
        required: true // Title is required
    },
    weight: {
        type: Number,
        required: true // Weight is required (could indicate task importance)
    },
    description: {
        type: String,
        required: true // Description is required
    },
    projectId: {
        type: Schema.Types.ObjectId, // Reference to the Project model
        ref: 'Project', // Establishes a relationship with the Project model
        required: true // Ensures every task is linked to a project
    }
});

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);
