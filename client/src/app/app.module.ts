import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor } from './jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalComponent } from './journal/journal.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthServiceService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
