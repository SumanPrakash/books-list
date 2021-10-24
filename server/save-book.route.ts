import { Request, Response } from "express";
import { BOOKS } from "./db-data";

export function saveBook(req: Request, res: Response) {
  const id = req.params["id"],
    changes = req.body;

  BOOKS[id] = {
    ...BOOKS[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(BOOKS[id]);
  }, 2000);
}
