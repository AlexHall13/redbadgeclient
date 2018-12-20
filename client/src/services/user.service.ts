import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`https://cosmoknot-server2.herokuapp.com/user/getall`);
    }

    getById(id: number) {
        return this.http.get(`https://cosmoknot-server2.herokuapp.com/users/` + id);
    }

    register(user: User) {
        return this.http.post(`https://cosmoknot-server2.herokuapp.com/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`https://cosmoknot-server2.herokuapp.com/user/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`https://cosmoknot-server2.herokuapp.com/user/delete` + id);
    }
}