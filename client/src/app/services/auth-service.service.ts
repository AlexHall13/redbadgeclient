import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../models/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable()
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(sessionStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  login(username, password, isAdmin) {
    return this.http.post<any>('https://cosmoknot-server2.herokuapp.com/user/login', { auth: { username, password, isAdmin } })
      .pipe(map(user => {
        if (user && user.sessionToken) {
          sessionStorage.setItem('currentUser', user.sessionToken);
          sessionStorage.setItem('isAdmin', user.user.isAdmin);
        }

        return user;

      }));

  }

  loggedIn() {
    if (sessionStorage.getItem('currentUser') === null) {
      return false
    } else {
      return true
    }
  }

  signup(username, password, isAdmin) {
    return this.http.post<any>('https://cosmoknot-server2.herokuapp.com/user/signup', { username, password, isAdmin })
      .pipe(map(user => {
        if (user && user.sessionToken) {
          sessionStorage.setItem('currentUser', user.sessionToken);

        }

        return user;

      }));
  }

  logout() {

    sessionStorage.removeItem('currentUser');
  }
}