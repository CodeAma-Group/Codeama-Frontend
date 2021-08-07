import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Operation } from 'fast-json-patch';
// import { followerId } from './follow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  token: string = localStorage.getItem('codeama_auth_token');
	userData: any = jwt_decode(this.token)
	userId: string = this.userData._id;

  baseUrl = `https://codeama-backend.herokuapp.com/users/${this.userId}/follow/`;
  patchUser(userId: number, operations: Operation){
    const url = this.baseUrl + userId;
    return this.http.patch(url, operations);
  }
}
