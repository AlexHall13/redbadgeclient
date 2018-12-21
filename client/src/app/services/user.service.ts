import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders ({
        'Content-Type' : 'application/json',
        
    })
}
@Injectable({
    providedIn: 'root'
  })
  
  export class UserService {
  
    private currentUserSubject: BehaviorSubject<Auth>;
    public currentUser: Observable<Auth>;
    isAdmin: boolean;
  
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  
    public get currentUserValue(): Auth{
      return this.currentUserSubject.value;
    }
  
    signup(username, password, isAdmin) {
      return this.http.post<any>(`https:localhost:3000/user/signup`, { user: { username, password, isAdmin } })
        .pipe(map(user => {
          if (user && user) {
  
            localStorage.setItem('token', user.sessionToken);
            console.log(user)
            console.log('You have hit this endpoint')
          }
          return user;
        }));
    }
    login(username, password, isAdmin) {
      return this.http.post<any>(`https:localhost:3000/user/login`, { user: { username, password, isAdmin } })
        .pipe(map(user => {
          if (user && user) {
  
            localStorage.setItem('token', user.sessionToken);
            localStorage.setItem('isAdmin', user.user.isAdmin);
            console.log(user)
            console.log('You have hit this endpoint')
          }
          return user;
        }));
    }

}