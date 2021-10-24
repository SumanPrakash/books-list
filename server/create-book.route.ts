import { Request, Response } from "express";
import { BOOKS } from "./db-data";

export var booksKeyCounter = 100;

export function createBook(req: Request, res: Response) {
  const changes = req.body;

  const newBook = {
    id: booksKeyCounter,
    seqNo: booksKeyCounter,
    ...changes,
  };

  BOOKS[newBook.id] = newBook;

  booksKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newBook);
  }, 2000);
}
