import express from "express";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import {isAuthenticatedUser} from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticatedUser,  createBook);
router.get("/", isAuthenticatedUser, getAllBooks);
router.get("/:id", isAuthenticatedUser, getBookById);
router.put("/:id", isAuthenticatedUser,  updateBook);
router.delete("/:id", isAuthenticatedUser, deleteBook);

export default router;
