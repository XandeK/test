import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavBarService } from '../nav-bar.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  results: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public nav: NavBarService,
    public authenticateService: AuthenticationService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.myForm.valid) {
      try {
        await this.authenticateService.login(
          this.myForm.get('email').value,
          this.myForm.get('password').value
        );
        this.router.navigateByUrl('/orderRecords');
        this.nav.show();
      } catch (error) {
        alert('Credentials are wrong');
      }
    } else {
      this.myForm.get('email').markAsDirty();
      this.myForm.get('password').markAsDirty();
    }
  }
}
