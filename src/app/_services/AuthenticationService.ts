import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';
import { CurdcommonserviceService } from './curdcommonservice.service';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private commonService: CurdcommonserviceService,
        public toastr: ToastrManager
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public get currentUserValue() {
        if (!this.currentUser) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        return this.currentUser;
    }

    login(username: string, password: string){
        return this.http.post<any>(environment.apiUrl + 'login', {email: username, password: password })
            .pipe(map(user => {
                console.log(user);
                if (user.success) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));

    }
    forgetPasswordMailCheck(email: string){
        return this.http.get<any>(environment.apiUrl + 'forget/' + email)
            .pipe(map(user => {
                return user;
            }));
    }
    registerMailCheck(email: string){
        return this.http.get<any>(environment.apiUrl + 'email/'+ email)
            .pipe(map(user => {
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
    tokenExpired(){
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.toastr.errorToastr('Token has expired');
      this.router.navigate(['/login']);
    }
    logout() {
        // remove user from local storage to log user out
        let currentUser: any;
        currentUser = this.currentUserValue;
        if (currentUser && currentUser.token) {
            let params: any;
            params = {token : currentUser.token}
            console.log(params)
            this.commonService.post('logout', params)
            .subscribe(
              data => {
                localStorage.removeItem('currentUser');
                this.currentUser = null;
                this.toastr.successToastr(data.message);
                this.router.navigate(['/login']);
              },
              error => {
                localStorage.removeItem('currentUser');
                this.currentUser = null;
                this.toastr.errorToastr(error);
                this.router.navigate(['/login']);
              });
        } else {
            localStorage.removeItem('currentUser');
            this.currentUser = null;
            this.router.navigate(['/login']);
        }
    }
}
