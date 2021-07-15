import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface User {
	Username: string,
	Email: string,
	Password: string
}

@Injectable({
  	providedIn: 'root'
})
export class UserService {

  	constructor(private http:HttpClient) { }

	register(user: User) {
		// return this.http.post('https://codeama-backend.herokuapp.com/register', user);
		console.log(user)
	}
}
