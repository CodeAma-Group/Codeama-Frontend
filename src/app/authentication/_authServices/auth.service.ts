import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _registerUrl = 'https://codeama-backend.onrender.com/register';
    private _loginUrl = 'https://codeama-backend.onrender.com/login';

    constructor(

        private http: HttpClient,
        private router: Router

    ) { }

    registerUser(user){
        return this.http.post<any>(this._registerUrl, user)
    }

    loginUser(user) {
        return this.http.post<any>(this._loginUrl,user)
    }

    loggedIn(){
        return !!localStorage.getItem('codeama_auth_token');
    }

    getToken(){
        return localStorage.getItem('codeama_auth_token');
    }

    logout(){
        localStorage.removeItem('codeama_auth_token');
        this.router.navigate(['/auth']);
    }
}
