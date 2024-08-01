import { IBook } from 'app/entities/book/book.model';

export interface IPublisher {
  id: number;
  name?: string | null;
  book?: IBook | null;
}

export type NewPublisher = Omit<IPublisher, 'id'> & { id: null };
