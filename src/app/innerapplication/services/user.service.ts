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
	userProfileData:any;

	getUserEntireProfileData(token: string) {
		return this.http.get(`https://codeama-backend.herokuapp.com/users/${token}`)
	}

	getUserDetails(){
        return this.http.get(`https://codeama-backend.herokuapp.com/users/token/decode`)
    }

	updateProfile(data) {
		// return this.http.put(`https://codeama-backend.herokuapp.com/users/${this.userId}/update`, data)
		return this.http.put(`https://codeama-backend.herokuapp.com/user/profile/update`, data)
	}
	getUserById(id){
		return this.http.get(`https://codeama-backend.herokuapp.com/users/${id}`)
	}

	getUserArticles() {
		return this.http.get(`https://codeama-backend.herokuapp.com/user/articles`)
	}

	getBugsSolvedBySingleUser() {
		return this.http.get(`https://codeama-backend.herokuapp.com/user/bugs`,{
			headers: {
			  "Authorization": localStorage.codeama_auth_token
			}
		  })
	}

	getAskedQuestionsBySingleUser() {
		return this.http.get(`https://codeama-backend.herokuapp.com/user/questions`)
	}

}
