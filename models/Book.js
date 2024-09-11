const mongoose = require('mongoose');

// Definindo o schema do livro
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required'],
    },
    year: {
        type: Number,
        required: [true, 'Year of publication is required'],
    },
    pages: {
        type: Number,
        required: [true, 'Number of pages is required'],
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
