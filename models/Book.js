import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the book title"],
        minLength: [2, "Title should not be less than 2 characters"]
    },
    author: {
        type: String,
        required: [true, "Please enter the author's name"],
    },
    publishedDate: {
        type: Date,
        required: [true, "Please enter the published date"]
    },
    numberOfPages: {
        type: Number,
        required: [true, "Please enter the number of pages"],
        min: [1, "Number of pages should be at least 1"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model("Book", BookSchema);
