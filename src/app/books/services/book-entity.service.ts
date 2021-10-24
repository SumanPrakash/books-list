import { Book } from "../model/book";
import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";

@Injectable()
export class BookEntityService extends EntityCollectionServiceBase<Book> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Book", serviceElementsFactory);
  }
}
