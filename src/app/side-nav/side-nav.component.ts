import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(
    public nav: NavBarService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  logOut(){
    this.nav.hide();
    this.authenticationService.username = null;
    this.authenticationService.isAuthenticated = false;
  }

}

