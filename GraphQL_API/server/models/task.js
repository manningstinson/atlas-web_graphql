const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the task schema
const taskSchema = new Schema({
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
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {
    // Add timestamps for when documents are created and modified
    timestamps: true
});

// Add index for better query performance when searching by projectId
taskSchema.index({ projectId: 1 });

// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);