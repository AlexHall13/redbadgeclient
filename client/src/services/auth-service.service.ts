import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthServiceService {
  constructor (private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('https://localhost:4200/user/login', { username: username, password: password })
    .pipe(map(user => {
      if (user && user.sessionToken) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    
      }

      return user;

    }));

  }

  signup(username: string, password: string) {
    return this.http.post<any>('https://localhost:4200/user/signup', { username: username, password: password })
    .pipe(map(user => {
      if (user && user.sessionToken) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
      }
      
    return user; 

  })); 
  }

  logout() {

    sessionStorage.removeItem('currentUser');
  }
  }