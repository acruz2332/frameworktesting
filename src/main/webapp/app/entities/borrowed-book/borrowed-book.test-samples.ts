import dayjs from 'dayjs/esm';

import { IBorrowedBook, NewBorrowedBook } from './borrowed-book.model';

export const sampleWithRequiredData: IBorrowedBook = {
  id: 24081,
};

export const sampleWithPartialData: IBorrowedBook = {
  id: 31436,
};

export const sampleWithFullData: IBorrowedBook = {
  id: 30084,
  borrowDate: dayjs('2024-07-31'),
};

export const sampleWithNewData: NewBorrowedBook = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
