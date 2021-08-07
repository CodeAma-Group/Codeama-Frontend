import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeamaService {

  constructor(private http: HttpClient) {}
  url="https://codeama-backend.herokuapp.com/codeama"
  auth_token = localStorage.getItem('codeama_auth_token');
  savecodeama(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`,
    });
    return this.http.post(this.url, data,{ headers: headers });
  }

  getcodeamas(){
    return this.http.get(this.url)
  }

  getcodeama(id){
    return this.http.get(`${this.url}/${id}`)
  }
}
