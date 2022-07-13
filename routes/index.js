import express from "express";
import { deleteUser, getAllUsers } from '../controllers/UserController.js';
import { Login, Logout, Register } from '../controllers/AuthController.js';
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/BookController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Auth } from "../middleware/Auth.js";

const router = express.Router();
// BUAT ENDPOINT
// AUTH
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

// TOKEN
router.get('/token', refreshToken);

// BOOKS
router.get('/books', getAllBooks);
router.get('/book/:id', getBookById);
router.post('/book', createBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

// USERS
router.get('/users', Auth, getAllUsers);
router.delete('/user/:id', deleteUser);

export default router;