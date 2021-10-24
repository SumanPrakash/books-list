import * as express from "express";
import { Application } from "express";
import { getAllBooks, getBookByUrl } from "./get-books.route";
import { loginUser } from "./auth.route";
import { saveBook } from "./save-book.route";
import { createBook } from "./create-book.route";
import { deleteBook } from "./delete-book.route";

const bodyParser = require("body-parser");

const app: Application = express();

app.use(bodyParser.json());

app.route("/api/login").post(loginUser);

app.route("/api/books").get(getAllBooks);

app.route("/api/book").post(createBook);

app.route("/api/book/:id").put(saveBook);

app.route("/api/book/:id").delete(deleteBook);

app.route("/api/books/:bookUrl").get(getBookByUrl);

const httpServer: any = app.listen(9000, () => {
  console.log(
    "HTTP REST API Server running at http://localhost:" +
      httpServer.address().port
  );
});
