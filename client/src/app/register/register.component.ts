import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  registerForm: FormGroup;
  validationErrors: string[] = []
  maxDate: Date;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      knownAs: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      dateOfBirth: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      city: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      country: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      username: [
        null,
        {
          validators: [Validators.required],
        },
      ],
      password: [
        null,
        {
          validators: [Validators.minLength(4), Validators.maxLength(8)],
        },
      ],
      confirmPassword: [
        null,
        {
          validators: [Validators.required, this.matchValues('password')],
        },
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  onRegister() {
    if (!this.registerForm.valid) {
      return;
    }
    this.accountService
      .register(this.registerForm.value)
      .subscribe((response) => {
        this.router.navigateByUrl('/members');
        this.cancelRegister.emit(false);
      }, error=> {
        this.validationErrors = error
        console.log(error);
      });
  }

  onCancel() {
    console.log('Cancelled');
    this.cancelRegister.emit(false);
  }
}
