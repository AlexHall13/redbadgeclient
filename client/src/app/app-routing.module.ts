import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const exposed_routes : Routes = [
  { path : '', component: HomeComponent },
  { path : 'journal', component : JournalComponent },
  { path : 'signup', component: SignupComponent},
  { path : 'login', component: LoginComponent}
]
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(exposed_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
