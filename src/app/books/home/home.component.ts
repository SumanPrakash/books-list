import { BookEntityService } from "../services/book-entity.service";
import { Component, OnInit } from "@angular/core";
import { compareBooks, Book } from "../model/book";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { EditBookDialogComponent } from "../edit-book-dialog/edit-book-dialog.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;

  books$: Observable<any>;

  searchText = "";

  constructor(
    private dialog: MatDialog,
    private booksEntityService: BookEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.books$ = this.booksEntityService.entities$.pipe(
      map((books) =>
        books.filter((book) => {
          return (
            book["volumeInfo"].title
              ?.toLowerCase()
              .indexOf(this.searchText.toLowerCase()) != -1 ||
            book["volumeInfo"].publisher
              ?.toLowerCase()
              .indexOf(this.searchText.toLowerCase()) != -1 ||
            book["volumeInfo"].publishedDate
              ?.toLowerCase()
              .indexOf(this.searchText.toLowerCase()) != -1 ||
            book["volumeInfo"].authors.includes(this.searchText.toLowerCase())
          );
        })
      )
    );

    this.loading$ = this.booksEntityService.loading$;
  }

  onAddBook() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create New Book",
      mode: "create",
    };

    this.dialog.open(EditBookDialogComponent, dialogConfig);
  }
}
