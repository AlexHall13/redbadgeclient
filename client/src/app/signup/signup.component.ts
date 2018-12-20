import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { AuthServiceService } from '../services/auth-service.service'
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  keepAfterNavigationChange = false;
  users = [];
  error = '';
  username: string;
  password: string;
  isAdmin = false;


  constructor( private router: Router,
               private userservice: UserService,
               private authservice: AuthServiceService,
               private http: HttpClient,
               private formBuilder: FormBuilder,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
   get f() { return this.registerForm.controls;}

   onSubmit() {
     this.submitted  = true;
     this.keepAfterNavigationChange = false;
     if (this.registerForm.invalid) {
       return;
     }
     this.loading = true;
     this.userservice.register(this.registerForm.value)
     .pipe(first())
     .subscribe(
       data  => {
         this.router.navigate(['/login']);
       }
     )
   }

  signup(username, password, isAdmin) {
    this.authservice.signup(username, password, isAdmin)
    .subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.error  = error;
      });
  }
}
