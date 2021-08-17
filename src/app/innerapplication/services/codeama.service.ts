import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CodeamaService {

  constructor(private http: HttpClient) {}
  url="https://codeama-backend.herokuapp.com/codeama"

  auth_token = localStorage.getItem('codeama_auth_token');
  userData:any = jwt_decode(this.auth_token)
  userId:number= this.userData._id

  // savecodeama(data) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.auth_token}`,
  //   });
  //   return this.http.post(this.url, data,{ headers: headers });
  // }

  getcodeamas(){
    return this.http.get(this.url)
  }

  getcodeama(id){
    return this.http.get(`${this.url}/${id}`)
  }

  baseUrl = `https://codeama-backend.herokuapp.com/users/${this.userId}/follow/`;

  // patch(followerId:string ){
  //   return this.http.patch(`https://codeama-backend.herokuapp.com/users/${this.userId}/follow/${followerId}`, followerId);
  // }

}
