import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;

  users = [];
  error = '';
  username: string;
  password: string;
  isAdmin = false;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthServiceService,
    private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.login(this.f.username.value,
      this.f.password.value,
      this.f.isAdmin.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/journal'])
        });
  }


  login(username, password, isAdmin) {
    this.authservice.login(username, password, isAdmin)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
        });
  }
}
