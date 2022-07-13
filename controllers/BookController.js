import Book from "../models/BookModel.js";

export const getAllBooks = async(req, res) => {
    try {
        const response = await Book.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBookById = async(req, res) => {
    try {
        const response = await Book.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createBook = async(req, res) => {
    const { name, year, author, image } = req.body;

    try {
        await Book.create({
            name: name,
            year: year,
            author: author,
            image: image,
        });
        res.status(201).json({ msg: "Book Created!" });
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const updateBook = async(req, res) => {
    const { name, year, author } = req.body;

    try {
        await Book.update({
            name: name,
            year: year,
            author: author,
        }, {
            where: { id: req.params.id }
        });
        res.status(201).json({ msg: "Book Updated!" })
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const deleteBook = async(req, res) => {
    try {
        await Book.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: "Book Deleted!" })
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}