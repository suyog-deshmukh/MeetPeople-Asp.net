
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onRegister(form: NgForm) {
    this.accountService
      .register(form.value.username, form.value.password)
      .subscribe((response) => {
        console.log(response);
        this.cancelRegister.emit(false);
      }, error=> {
        console.log(error);
        this.toastr.error(error.error);
      });
  }

  onCancel() {
    console.log('Cancelled');
    this.cancelRegister.emit(false);
  }
}
