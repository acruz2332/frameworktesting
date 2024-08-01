import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BorrowedBookDetailComponent } from './borrowed-book-detail.component';

describe('BorrowedBook Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedBookDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BorrowedBookDetailComponent,
              resolve: { borrowedBook: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BorrowedBookDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load borrowedBook on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BorrowedBookDetailComponent);

      // THEN
      expect(instance.borrowedBook).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
