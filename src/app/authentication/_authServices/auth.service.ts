import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _registerUrl = 'https://codeama-backend.herokuapp.com/register';
    private _loginUrl = 'https://codeama-backend.herokuapp.com/login';

    constructor(

        private http: HttpClient,
        // private router: Router

    ) { }

    registerUser(user){
        return this.http.post<any>(this._registerUrl, user)
    }

    loginUser(user) {
        return this.http.post<any>(this._loginUrl,user)
    }


}
