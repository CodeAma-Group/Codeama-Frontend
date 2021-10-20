import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private http: HttpClient) { }

	auth_token = localStorage.getItem('codeama_auth_token');
	userData: any = jwt_decode(this.auth_token)

	userId: number = this.userData._id
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${this.auth_token}`,
	});
	getNotifications() {
		return this.http.get(`https://codeama-backend.herokuapp.com/user/notifications/`, { headers: this.headers })
	}

	markAllAsRead(){
		return this.http.put(`https://codeama-backend.herokuapp.com/notifications/readAll`, {headers: this.headers})
	}


	markAsRead(notiId){
		return this.http.put(`https://codeama-backend.herokuapp.com/notifications/${notiId}/read`, {headers: this.headers})
	}

	deleteNoti(notiId){
		return this.http.delete(`https://codeama-backend.herokuapp.com/notifications/${notiId}/delete`, {headers: this.headers})
	}
}
