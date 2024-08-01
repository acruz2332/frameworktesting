import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'publisher',
    data: { pageTitle: 'libraryApp.publisher.home.title' },
    loadChildren: () => import('./publisher/publisher.routes'),
  },
  {
    path: 'author',
    data: { pageTitle: 'libraryApp.author.home.title' },
    loadChildren: () => import('./author/author.routes'),
  },
  {
    path: 'client',
    data: { pageTitle: 'libraryApp.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  {
    path: 'book',
    data: { pageTitle: 'libraryApp.book.home.title' },
    loadChildren: () => import('./book/book.routes'),
  },
  {
    path: 'borrowed-book',
    data: { pageTitle: 'libraryApp.borrowedBook.home.title' },
    loadChildren: () => import('./borrowed-book/borrowed-book.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
