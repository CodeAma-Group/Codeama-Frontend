import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  url="https://codeama-backend.herokuapp.com/project"
  auth_token = localStorage.getItem('codeama_auth_token');
  saveProject(data) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.auth_token}`,
    // });
    return this.http.post(this.url, data);
  }
  getProjects(){
 return this.http.get(this.url)
  }
  getProject(id){
    return this.http.get(`${this.url}/${id}`)
    }
}
