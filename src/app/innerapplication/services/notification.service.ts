import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private http: HttpClient ) { }
	
 	url="https://codeama-backend.herokuapp.com/codeama"
	token: string = localStorage.getItem('codeama_auth_token');
	userData: any = jwt_decode(this.token)
	userId: string = this.userData._id;


  getNotifications(){
	return this.http.get(`https://codeama-backend.herokuapp.com/notifications/${this.userId}`)
  }

}
