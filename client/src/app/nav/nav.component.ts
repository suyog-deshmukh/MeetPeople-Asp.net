import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    this.accountService
      .login(form.value.username.toLowerCase(), form.value.password)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/members');
          console.log(response);
        }
      );
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
