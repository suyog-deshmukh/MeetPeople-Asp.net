import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({providedIn: "root"})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinner: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      // fullScreen: true
    });
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
