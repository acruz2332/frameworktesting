import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBook } from 'app/entities/book/book.model';
import { BookService } from 'app/entities/book/service/book.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { BorrowedBookService } from '../service/borrowed-book.service';
import { IBorrowedBook } from '../borrowed-book.model';
import { BorrowedBookFormService, BorrowedBookFormGroup } from './borrowed-book-form.service';

@Component({
  standalone: true,
  selector: 'jhi-borrowed-book-update',
  templateUrl: './borrowed-book-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BorrowedBookUpdateComponent implements OnInit {
  isSaving = false;
  borrowedBook: IBorrowedBook | null = null;

  booksCollection: IBook[] = [];
  clientsCollection: IClient[] = [];

  editForm: BorrowedBookFormGroup = this.borrowedBookFormService.createBorrowedBookFormGroup();

  constructor(
    protected borrowedBookService: BorrowedBookService,
    protected borrowedBookFormService: BorrowedBookFormService,
    protected bookService: BookService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareBook = (o1: IBook | null, o2: IBook | null): boolean => this.bookService.compareBook(o1, o2);

  compareClient = (o1: IClient | null, o2: IClient | null): boolean => this.clientService.compareClient(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ borrowedBook }) => {
      this.borrowedBook = borrowedBook;
      if (borrowedBook) {
        this.updateForm(borrowedBook);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const borrowedBook = this.borrowedBookFormService.getBorrowedBook(this.editForm);
    if (borrowedBook.id !== null) {
      this.subscribeToSaveResponse(this.borrowedBookService.update(borrowedBook));
    } else {
      this.subscribeToSaveResponse(this.borrowedBookService.create(borrowedBook));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBorrowedBook>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(borrowedBook: IBorrowedBook): void {
    this.borrowedBook = borrowedBook;
    this.borrowedBookFormService.resetForm(this.editForm, borrowedBook);

    this.booksCollection = this.bookService.addBookToCollectionIfMissing<IBook>(this.booksCollection, borrowedBook.book);
    this.clientsCollection = this.clientService.addClientToCollectionIfMissing<IClient>(this.clientsCollection, borrowedBook.client);
  }

  protected loadRelationshipsOptions(): void {
    this.bookService
      .query({ 'borrowedBookId.specified': 'false' })
      .pipe(map((res: HttpResponse<IBook[]>) => res.body ?? []))
      .pipe(map((books: IBook[]) => this.bookService.addBookToCollectionIfMissing<IBook>(books, this.borrowedBook?.book)))
      .subscribe((books: IBook[]) => (this.booksCollection = books));

    this.clientService
      .query({ 'borrowedBookId.specified': 'false' })
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing<IClient>(clients, this.borrowedBook?.client)))
      .subscribe((clients: IClient[]) => (this.clientsCollection = clients));
  }
}
