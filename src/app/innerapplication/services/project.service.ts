import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  url="https://codeama-backend.herokuapp.com/project"
  saveProject(data) {
    return this.http.post(this.url, data);
  }
  getProjects(){
 return this.http.get(this.url)
  }
  getProject(id){
    return this.http.get(`${this.url}/${id}`)
    }
}
