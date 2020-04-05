import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  myForm: FormGroup;
  results: any = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      reTypePassword: ['']
    });
  }

  async onSubmit() {
    if (this.myForm.value.oldPassword === this.myForm.value.password) {
      alert('Old and New Password cannot be the same. Please change your new Password!');
    } else {
      if (this.myForm.value.password === this.myForm.value.reTypePassword) {
        try {
          await this.authenticationService.changePassword(this.myForm.get('password').value)
          alert('Password Changed');
          this.router.navigateByUrl('/orderRecords');
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Inconsistent new password and Re-type passsword. Please Fill in again.')
      }
    }
  }
}
