import { Request, Response } from "express";
import { BOOKS } from "./db-data";

export function deleteBook(req: Request, res: Response) {
  const id = req.params["id"];

  delete BOOKS[id];

  setTimeout(() => {
    res.status(200).json({ id });
  }, 2000);
}
