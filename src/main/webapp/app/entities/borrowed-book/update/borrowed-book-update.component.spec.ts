import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IBook } from 'app/entities/book/book.model';
import { BookService } from 'app/entities/book/service/book.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IBorrowedBook } from '../borrowed-book.model';
import { BorrowedBookService } from '../service/borrowed-book.service';
import { BorrowedBookFormService } from './borrowed-book-form.service';

import { BorrowedBookUpdateComponent } from './borrowed-book-update.component';

describe('BorrowedBook Management Update Component', () => {
  let comp: BorrowedBookUpdateComponent;
  let fixture: ComponentFixture<BorrowedBookUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let borrowedBookFormService: BorrowedBookFormService;
  let borrowedBookService: BorrowedBookService;
  let bookService: BookService;
  let clientService: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BorrowedBookUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BorrowedBookUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BorrowedBookUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    borrowedBookFormService = TestBed.inject(BorrowedBookFormService);
    borrowedBookService = TestBed.inject(BorrowedBookService);
    bookService = TestBed.inject(BookService);
    clientService = TestBed.inject(ClientService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call book query and add missing value', () => {
      const borrowedBook: IBorrowedBook = { id: 456 };
      const book: IBook = { id: 3544 };
      borrowedBook.book = book;

      const bookCollection: IBook[] = [{ id: 15985 }];
      jest.spyOn(bookService, 'query').mockReturnValue(of(new HttpResponse({ body: bookCollection })));
      const expectedCollection: IBook[] = [book, ...bookCollection];
      jest.spyOn(bookService, 'addBookToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ borrowedBook });
      comp.ngOnInit();

      expect(bookService.query).toHaveBeenCalled();
      expect(bookService.addBookToCollectionIfMissing).toHaveBeenCalledWith(bookCollection, book);
      expect(comp.booksCollection).toEqual(expectedCollection);
    });

    it('Should call client query and add missing value', () => {
      const borrowedBook: IBorrowedBook = { id: 456 };
      const client: IClient = { id: 11653 };
      borrowedBook.client = client;

      const clientCollection: IClient[] = [{ id: 28964 }];
      jest.spyOn(clientService, 'query').mockReturnValue(of(new HttpResponse({ body: clientCollection })));
      const expectedCollection: IClient[] = [client, ...clientCollection];
      jest.spyOn(clientService, 'addClientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ borrowedBook });
      comp.ngOnInit();

      expect(clientService.query).toHaveBeenCalled();
      expect(clientService.addClientToCollectionIfMissing).toHaveBeenCalledWith(clientCollection, client);
      expect(comp.clientsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const borrowedBook: IBorrowedBook = { id: 456 };
      const book: IBook = { id: 10715 };
      borrowedBook.book = book;
      const client: IClient = { id: 13439 };
      borrowedBook.client = client;

      activatedRoute.data = of({ borrowedBook });
      comp.ngOnInit();

      expect(comp.booksCollection).toContain(book);
      expect(comp.clientsCollection).toContain(client);
      expect(comp.borrowedBook).toEqual(borrowedBook);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBorrowedBook>>();
      const borrowedBook = { id: 123 };
      jest.spyOn(borrowedBookFormService, 'getBorrowedBook').mockReturnValue(borrowedBook);
      jest.spyOn(borrowedBookService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ borrowedBook });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: borrowedBook }));
      saveSubject.complete();

      // THEN
      expect(borrowedBookFormService.getBorrowedBook).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(borrowedBookService.update).toHaveBeenCalledWith(expect.objectContaining(borrowedBook));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBorrowedBook>>();
      const borrowedBook = { id: 123 };
      jest.spyOn(borrowedBookFormService, 'getBorrowedBook').mockReturnValue({ id: null });
      jest.spyOn(borrowedBookService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ borrowedBook: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: borrowedBook }));
      saveSubject.complete();

      // THEN
      expect(borrowedBookFormService.getBorrowedBook).toHaveBeenCalled();
      expect(borrowedBookService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBorrowedBook>>();
      const borrowedBook = { id: 123 };
      jest.spyOn(borrowedBookService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ borrowedBook });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(borrowedBookService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBook', () => {
      it('Should forward to bookService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bookService, 'compareBook');
        comp.compareBook(entity, entity2);
        expect(bookService.compareBook).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareClient', () => {
      it('Should forward to clientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clientService, 'compareClient');
        comp.compareClient(entity, entity2);
        expect(clientService.compareClient).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
