import mongoose from 'mongoose';

// Define the Blogs Schema
const blogSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Create models based on the schemas
export const blogs = mongoose.models.blogs || mongoose.model('blogs', blogSchema);