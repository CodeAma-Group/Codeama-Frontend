import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor( private http: HttpClient ) { }

	token: string = localStorage.getItem('codeama_auth_token');
	userData: any = jwt_decode(this.token)
	userId: string = this.userData._id;

	getUserEntireProfileData(token: string) {
		return this.http.get(`https://codeama-backend.herokuapp.com/users/${token}`)
	}

	getUserDetails(){
        return this.http.get(`https://codeama-backend.herokuapp.com/users/${this.token}/decode`)
    }

	updateProfile(data) {
		return this.http.put(`https://codeama-backend.herokuapp.com/users/${this.userId}/update`, data)
	}

}
