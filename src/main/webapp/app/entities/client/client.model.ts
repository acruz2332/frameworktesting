import { IBorrowedBook } from 'app/entities/borrowed-book/borrowed-book.model';

export interface IClient {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  address?: string | null;
  phone?: string | null;
  borrowedBook?: IBorrowedBook | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
