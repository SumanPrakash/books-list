import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { BooksCardListComponent } from "./books-card-list/books-card-list.component";
import { EditBookDialogComponent } from "./edit-book-dialog/edit-book-dialog.component";
import { BookComponent } from "./book/book.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from "@ngrx/data";
import { compareBooks, Book } from "./model/book";

import { BooksResolver } from "./services/books.resolver";
import { BookEntityService } from "./services/book-entity.service";
import { BooksDataService } from "./services/books-data.service";
import { MatGridListModule } from "@angular/material/grid-list";

export const booksRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      books: BooksResolver,
    },
  },
  {
    path: ":bookUrl",
    component: BookComponent,
    resolve: {
      books: BooksResolver,
    },
  },
];

const entityMetadata: EntityMetadataMap = {
  Book: {
    sortComparer: compareBooks,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
    filterFn: (entities: { name: string }[], search: string) => {
      return entities.filter((entity) => -1 < entity.name.indexOf(search));
    },
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(booksRoutes),
  ],
  declarations: [
    HomeComponent,
    BooksCardListComponent,
    EditBookDialogComponent,
    BookComponent,
  ],
  exports: [
    HomeComponent,
    BooksCardListComponent,
    EditBookDialogComponent,
    BookComponent,
  ],
  entryComponents: [EditBookDialogComponent],
  providers: [BooksResolver, BookEntityService, BooksDataService],
})
export class BooksModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private booksDataService: BooksDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService("Book", booksDataService);
  }
}
