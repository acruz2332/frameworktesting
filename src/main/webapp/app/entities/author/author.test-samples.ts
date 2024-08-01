import { IAuthor, NewAuthor } from './author.model';

export const sampleWithRequiredData: IAuthor = {
  id: 29130,
  firstName: 'Quinten',
  lastName: 'Hodkiewicz',
};

export const sampleWithPartialData: IAuthor = {
  id: 6516,
  firstName: 'Heath',
  lastName: 'Luettgen',
};

export const sampleWithFullData: IAuthor = {
  id: 20689,
  firstName: 'Meghan',
  lastName: 'Koch',
};

export const sampleWithNewData: NewAuthor = {
  firstName: 'Kale',
  lastName: 'Johnston',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
