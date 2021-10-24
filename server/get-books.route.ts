import { Request, Response } from "express";
import { BOOKS } from "./db-data";

export function getAllBooks(req: Request, res: Response) {
  setTimeout(() => {
    res.status(200).json({ payload: BOOKS.items });
  }, 1000);
}

export function getBookByUrl(req: Request, res: Response) {
  const bookUrl = req.params["bookUrl"];

  const books: any = Object.values(BOOKS);

  const book = books.find((book) => book.url == bookUrl);

  setTimeout(() => {
    res.status(200).json(book);
  }, 1000);
}
