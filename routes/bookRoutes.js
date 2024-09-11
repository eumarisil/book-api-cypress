const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Rota para cadastrar um novo livro
router.post('/books', async (req, res) => {
    try {
        const { title, author, publisher, year, pages } = req.body;

        if (!title || !author || !publisher || !year || !pages) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const dupe = await Book.findOne({title: title})
        if (dupe) {
            return res.status(400).json({ erro: 'The book title has already been registered!' })

        }

        const newBook = new Book({ title, author, publisher, year, pages });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
});

// Rota para listar todos os livros
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

// Rota para consultar um livro por ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
});

// Rota para remover um livro por ID
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
