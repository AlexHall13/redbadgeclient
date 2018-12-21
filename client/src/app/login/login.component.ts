import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  users = [];
  error = '';
  username: string;
  password: string;
  isAdmin = false;

  constructor(private router: Router, private userservice: UserService, private http: HttpClient) { }

  ngOnInit() {

  }

  public login(username, password, isAdmin) {
    this.userservice.login(username, password, isAdmin)
    .subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.error  = error;
      });
  }

}
