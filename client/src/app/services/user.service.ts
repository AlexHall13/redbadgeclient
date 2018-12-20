import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from '../models/auth';

const httpOptions = {
    headers: new HttpHeaders ({
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.getItem('currentUser')
    })
}

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Auth[]>(`https://cosmoknot-server2.herokuapp.com/user/getall`);
    }

    getById(id: number) {
        return this.http.get(`https://cosmoknot-server2.herokuapp.com/users/` + id);
    }

    register(user: Auth) {
        return this.http.post(`https://cosmoknot-server2.herokuapp.com/users/register`, user);
    }

    update(user: Auth) {
        return this.http.put(`https://cosmoknot-server2.herokuapp.com/user/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`https://cosmoknot-server2.herokuapp.com/user/delete` + id);
    }
}