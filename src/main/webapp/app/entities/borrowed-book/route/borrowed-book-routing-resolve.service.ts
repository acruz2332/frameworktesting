import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBorrowedBook } from '../borrowed-book.model';
import { BorrowedBookService } from '../service/borrowed-book.service';

export const borrowedBookResolve = (route: ActivatedRouteSnapshot): Observable<null | IBorrowedBook> => {
  const id = route.params['id'];
  if (id) {
    return inject(BorrowedBookService)
      .find(id)
      .pipe(
        mergeMap((borrowedBook: HttpResponse<IBorrowedBook>) => {
          if (borrowedBook.body) {
            return of(borrowedBook.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default borrowedBookResolve;
