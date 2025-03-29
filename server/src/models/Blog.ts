import mongoose, { Document, Schema } from 'mongoose';

// Interface for Blog document
export interface IBlog extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    slug: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    theme?: string;
    isSelectedForEmbed: boolean;
}

// Blog Schema
const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isSelectedForEmbed: {
        type: Boolean,
        default: false
    },
    theme: {
        type: String,
        default: 'default'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
blogSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Generate slug from title before saving
blogSchema.pre('save', function (next) {
    if (!this.isModified('title')) return next();

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    next();
});

export const Blog = mongoose.model<IBlog>('Blog', blogSchema); 