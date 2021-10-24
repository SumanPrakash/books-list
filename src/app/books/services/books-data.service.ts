import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Book } from "../model/book";
import { map } from "rxjs/operators";

@Injectable()
export class BooksDataService extends DefaultDataService<Book> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Book", http, httpUrlGenerator);
  }

  getAll(): Observable<Book[]> {
    return this.http.get("/api/books").pipe(map((res) => res["payload"]));
  }

  // getAll(): Observable<Book[]> {
  //   return this.http
  //     .get("https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep")
  //     .pipe(map((res) => res["items"]));
  // }
}
