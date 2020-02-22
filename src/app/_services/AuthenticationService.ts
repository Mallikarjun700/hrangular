import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: any;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public get currentUserValue() {
        return this.currentUser;
    }

    login(username: string, password: string){
       // console.log({username: username, password: password });
        // return this.http.post(environment.apiUrl + 'login', {email: username, password: password });
        return this.http.post<any>(environment.apiUrl + 'login', {email: username, password: password })
            .pipe(map(user => {
                if (user.success) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));

    }
    register(username: string, email: string, password: string){
       // console.log({username: username, password: password });
        // return this.http.post(environment.apiUrl + 'login', {email: username, password: password });
        return this.http.post<any>(environment.apiUrl + 'register',
            { name: username, email: email, password: password, confirme_password: password }
        )
            .pipe(map(user => {
                if (user.success) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser=null;
        // console.log(this.currentUser);
    }
}
