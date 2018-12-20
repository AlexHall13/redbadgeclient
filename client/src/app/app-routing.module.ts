import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { HomeComponent } from './home/home.component';

const exposed_routes : Routes = [
  { path : '', component: HomeComponent },
  { path : 'journal', component : JournalComponent },
]
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(exposed_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
