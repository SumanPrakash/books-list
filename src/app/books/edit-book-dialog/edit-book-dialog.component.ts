import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Book } from "../model/book";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { BookEntityService } from "../services/book-entity.service";

@Component({
  selector: "book-dialog",
  templateUrl: "./edit-book-dialog.component.html",
  styleUrls: ["./edit-book-dialog.component.css"],
})
export class EditBookDialogComponent {
  form: FormGroup;

  dialogTitle: string;

  book: Book;

  mode: "create" | "update";

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private booksEntityService: BookEntityService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.book = data.book;
    this.mode = data.mode;

    const formControls = {
      description: ["", Validators.required],
      longDescription: ["", Validators.required],
    };

    if (this.mode == "update") {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.book });
    } else if (this.mode == "create") {
      this.form = this.fb.group({
        ...formControls,
        url: ["", Validators.required],
        iconUrl: ["", Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const book: Book = {
      ...this.book,
      ...this.form.value,
    };

    if (this.mode == "update") {
      this.booksEntityService.update(book);
      this.dialogRef.close();
    } else if (this.mode == "create") {
      this.booksEntityService.add(book).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
