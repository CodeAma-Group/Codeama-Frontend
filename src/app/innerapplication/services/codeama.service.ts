import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CodeamaService {

  constructor(private http: HttpClient) {}
  url="https://codeama-backend.herokuapp.com/codeama"
  data:any;
  auth_token = localStorage.getItem('codeama_auth_token');
  userData:any = jwt_decode(this.auth_token)
  
  userId:number= this.userData._id
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`,
  });
  
  savecodeama(data:FormData) {
    return this.http.post(`https://codeama-backend.herokuapp.com/codeama`,  data , { headers: this.headers });
  }

  getcodeamas(){
    return this.http.get(this.url)
  }

  baseUrl = `https://codeama-backend.herokuapp.com/users/${this.userId}/follow/`;

  updateFollower(followerId:string ){
    console.log(this.userId);
    return this.http.patch(`https://codeama-backend.herokuapp.com/users/${this.userId}/follow/${followerId}`, {headers: this.headers});
  }

  updateUnfollower(unfollowerId: string){
    return this.http.patch(`https://codeama-backend.herokuapp.com/users/${this.userId}/unfollow/${unfollowerId}`, {headers: this.headers});
  }

  askama(question){
    return this.http.post(`https://codeama-backend.herokuapp.com/ask_question`, {question : question } , { headers: this.headers })
  }
}
  