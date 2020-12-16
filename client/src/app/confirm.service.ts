import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { observable, Observable } from 'rxjs';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModalref: BsModalRef;
  constructor(private modalService: BsModalService) {}
  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkTest= 'Ok',
    btnCancelText = 'Cancel'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkTest,
        btnCancelText,
      },
    };
    this.bsModalref = this.modalService.show(ConfirmDialogComponent, config);
    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observer) => {
      const subscription = this.bsModalref.onHidden.subscribe(() => {
        observer.next(this.bsModalref.content.result);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        },
      };
    };
  }
}
