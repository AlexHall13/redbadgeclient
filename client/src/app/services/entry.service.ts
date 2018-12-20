import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from '../models/entry';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  postEntry(userId: number, entry:Entry ) {
    return this.http.put(`https://cosmoknot-server2.herokuapp.com/entry/createnew` + userId, entry, httpOptions)
  }


  getAll(userId:number):Observable<Entry[]>{
    return this.http.get<Entry[]>(`https://cosmoknot-server2.herokuapp.com/entry/getall`+ userId, httpOptions)
}

getAItem(id){
  return this.http.get(`https://cosmoknot-server2.herokuapp.com/edit/get/` + id)
}

update(entryId, entry){  
  return this.http.put(`https://cosmoknot-server2.herokuapp.com/entry/edit/` + entryId, entry, httpOptions)
}

entryDelete(id){
  return this.http.delete(`https://cosmoknot-server2.herokuapp.com/entry/delete/` + id, httpOptions)
}

}