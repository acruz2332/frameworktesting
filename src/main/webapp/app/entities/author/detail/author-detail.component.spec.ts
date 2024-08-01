import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthorDetailComponent } from './author-detail.component';

describe('Author Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AuthorDetailComponent,
              resolve: { author: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AuthorDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load author on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AuthorDetailComponent);

      // THEN
      expect(instance.author).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
