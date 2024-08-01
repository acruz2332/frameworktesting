import { IBook, NewBook } from './book.model';

export const sampleWithRequiredData: IBook = {
  id: 6385,
  isbn: 'lest uselessl',
  name: 'uh-huh',
  publishYear: 'seriously',
  copies: 27304,
};

export const sampleWithPartialData: IBook = {
  id: 12640,
  isbn: 'whenX',
  name: 'tenderly hopelessly continually',
  publishYear: 'implode whirlwind teeter',
  copies: 12455,
};

export const sampleWithFullData: IBook = {
  id: 1484,
  isbn: 'phew cumberso',
  name: 'shocked',
  publishYear: 'haXX',
  copies: 15067,
  cover: '../fake-data/blob/hipster.png',
  coverContentType: 'unknown',
};

export const sampleWithNewData: NewBook = {
  isbn: 'tusk chuckle',
  name: 'wherever by worth',
  publishYear: 'kissingly assembly',
  copies: 13998,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
