import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 16173,
  firstName: 'Lina',
  lastName: 'Langworth',
};

export const sampleWithPartialData: IClient = {
  id: 23935,
  firstName: 'Kaitlyn',
  lastName: 'Bogan',
  email: 'Brycen_Gerlach78@gmail.com',
  address: 'crime well-groomed',
};

export const sampleWithFullData: IClient = {
  id: 14235,
  firstName: 'Rene',
  lastName: 'Stanton',
  email: 'Jaleel.Funk11@hotmail.com',
  address: 'which sturgeon mystify',
  phone: '1-595-869-1083 x3752',
};

export const sampleWithNewData: NewClient = {
  firstName: 'Evelyn',
  lastName: 'Ledner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
