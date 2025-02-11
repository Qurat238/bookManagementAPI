import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Book from "../models/Book.js";

// Create a new book (Only authenticated users)
export const createBook = catchAsyncErrors(async (req, res, next) => {
    const { title, author, publishedDate, numberOfPages } = req.body;

    const book = await Book.create({
        title,
        author,
        publishedDate,
        numberOfPages,
        createdBy: req.user.id // Track user who added the book
    });

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        book
    });
});

// Get all books (Only authenticated users)
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find({ createdBy: req.user.id }); // Only return books created by the logged-in user

    res.status(200).json({
        success: true,
        books
    });
});

// Get a single book by ID (Only authenticated users)
export const getBookById = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!book) {
        return next(new ErrorHandler("Book not found or you do not have permission to view it", 404));
    }

    res.status(200).json({
        success: true,
        book
    });
});

// Update book details (Only the user who created it)
export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!book) {
        return next(new ErrorHandler("Book not found or you do not have permission to update it", 404));
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        book
    });
});

// Delete a book (Only the user who created it)
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!book) {
        return next(new ErrorHandler("Book not found or you do not have permission to delete it", 404));
    }

    await book.deleteOne();

    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
});
