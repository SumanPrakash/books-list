import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../model/book";
import { Observable, of } from "rxjs";
import {
  concatMap,
  delay,
  filter,
  first,
  map,
  shareReplay,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { BookEntityService } from "../services/book-entity.service";

@Component({
  selector: "book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  book$: Observable<Book>;

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  constructor(
    private booksEntityService: BookEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const bookUrl = this.route.snapshot.paramMap.get("bookUrl");

    this.book$ = this.booksEntityService.entities$.pipe(
      map((books) => books.find((book) => book.url == bookUrl))
    );
  }
}
