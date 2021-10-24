import { BookEntityService } from "../services/book-entity.service";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Book } from "../model/book";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
  selector: "books-card-list",
  templateUrl: "./books-card-list.component.html",
  styleUrls: ["./books-card-list.component.css"],
})
export class BooksCardListComponent {
  @Input()
  books: Book[];

  @Output()
  bookChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private bookEntityService: BookEntityService
  ) {}
}
