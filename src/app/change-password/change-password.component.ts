import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  myForm: FormGroup;
  results: any = false;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      reTypePassword: ['']
    });
  }

  onSubmit() {
    if (this.myForm.value.oldPassword === this.myForm.value.password){
      alert('Old and New Password cannot be the same. Please change your new Password!');
    }else {
      if (this.myForm.value.password === this.myForm.value.reTypePassword) {
      alert('Password Changed');
      this.router.navigateByUrl('/orderRecords');
      // this.authService.authUser(this.myForm.value.email, this.myForm.value.password).subscribe(data => {
      //   this.results = data;
      //   if (this.results[0].auth = 'false') {
      //     sessionStorage.setItem('id', this.myForm.value.email);
      //     this.authService.setSecureToken(this.myForm.value.email);
      //     this.router.navigateByUrl('/home');
      //     this.nav.show()
      //   else{
      //     alert('Email or Password is Incorrect');
      //   }
      // });
    } else {
      console.log(this.myForm.value.password);
      console.log('password');
      console.log(this.myForm.value.reTypePassword);
      alert('Inconsistent new password and Re-type passsword. Please Fill in again.')
    }}
  }

}
