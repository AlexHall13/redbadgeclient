import { Component, OnInit} from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Entry } from '../models/entry'; 




@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})

export class JournalComponent implements OnInit{
  userId: number;
  journalForm: FormGroup;
  entry: Entry;
  results: any;


  constructor(
    private entryService: EntryService, private form: FormBuilder
   

  ) {}

ngOnInit() {
  this.journalForm = this.form.group({
    title: new FormControl,
    content: new FormControl,
    dateAdded: new FormControl
  })
}
  onSubmit () {
  this.entryService.postEntry (this.userId, this.journalForm.value) 
  .subscribe(this.results)
  console.log(this.results)

}}
