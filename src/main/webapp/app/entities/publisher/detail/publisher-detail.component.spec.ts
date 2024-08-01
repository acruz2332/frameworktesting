import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PublisherDetailComponent } from './publisher-detail.component';

describe('Publisher Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: PublisherDetailComponent,
              resolve: { publisher: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(PublisherDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load publisher on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PublisherDetailComponent);

      // THEN
      expect(instance.publisher).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
