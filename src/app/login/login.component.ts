import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  results: any = false;
  constructor(private fb: FormBuilder,  private router: Router, public nav: NavBarService ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.router.navigateByUrl('/orderRecords');
    this.nav.show();
    // this.authService.authUser(this.myForm.value.email, this.myForm.value.password).subscribe(data => {
    //   this.results = data;
    //   if (this.results[0].auth = 'false') {
    //     sessionStorage.setItem('id', this.myForm.value.email);
    //     this.authService.setSecureToken(this.myForm.value.email);
    //     this.router.navigateByUrl('/home');
    //     this.nav.show()
      }
    //   else{
    //     alert('Email or Password is Incorrect');
    //   }
    // });

}
