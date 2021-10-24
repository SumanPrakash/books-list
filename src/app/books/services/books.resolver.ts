import { filter, first, map, tap } from "rxjs/operators";
import { BookEntityService } from "./book-entity.service";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class BooksResolver implements Resolve<boolean> {
  constructor(private booksEntityService: BookEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.booksEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.booksEntityService.getAll().pipe();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
