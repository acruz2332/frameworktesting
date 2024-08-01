import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BorrowedBookComponent } from './list/borrowed-book.component';
import { BorrowedBookDetailComponent } from './detail/borrowed-book-detail.component';
import { BorrowedBookUpdateComponent } from './update/borrowed-book-update.component';
import BorrowedBookResolve from './route/borrowed-book-routing-resolve.service';

const borrowedBookRoute: Routes = [
  {
    path: '',
    component: BorrowedBookComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BorrowedBookDetailComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BorrowedBookUpdateComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BorrowedBookUpdateComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default borrowedBookRoute;
