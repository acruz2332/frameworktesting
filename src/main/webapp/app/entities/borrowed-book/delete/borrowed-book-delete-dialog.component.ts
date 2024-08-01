import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBorrowedBook } from '../borrowed-book.model';
import { BorrowedBookService } from '../service/borrowed-book.service';

@Component({
  standalone: true,
  templateUrl: './borrowed-book-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BorrowedBookDeleteDialogComponent {
  borrowedBook?: IBorrowedBook;

  constructor(
    protected borrowedBookService: BorrowedBookService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.borrowedBookService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
