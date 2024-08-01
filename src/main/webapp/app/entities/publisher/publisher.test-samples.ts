import { IPublisher, NewPublisher } from './publisher.model';

export const sampleWithRequiredData: IPublisher = {
  id: 32297,
  name: 'for eddy desire',
};

export const sampleWithPartialData: IPublisher = {
  id: 27896,
  name: 'ah sponsor except',
};

export const sampleWithFullData: IPublisher = {
  id: 15091,
  name: 'constrain',
};

export const sampleWithNewData: NewPublisher = {
  name: 'keenly opposite',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
