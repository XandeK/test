import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  username: string;
  isAuthenticated: boolean;

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/authenticateUser', {
        username: username,
        password: password
      }).toPromise().then(results => {
        if (results) {
          this.username = username;
          this.isAuthenticated = true;
          resolve(true);
        } else {
          this.isAuthenticated = false;
          reject(false);
        }
      })
    })
  }

  changePassword(password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/updatePassword', {
        username: this.username,
        password: password
      }).toPromise().then(results => {
        if (results) {
          resolve(true);
        } else {
          reject(false);
        }
      })
    })
  }
}
