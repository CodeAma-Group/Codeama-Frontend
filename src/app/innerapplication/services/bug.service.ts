import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  getUrl = 'https://codeama-backend.herokuapp.com/all_bugs';
  getByIdUrl = 'https://codeama-backend.herokuapp.com/solved_bugs/JJ';
  postUrl = 'https://codeama-backend.herokuapp.com/post_bug';
  constructor(private http: HttpClient) {}
  auth_token = localStorage.getItem('codeama_auth_token');
  getBugs() {
    return this.http.get(this.getUrl);
  }
  getBug(id) {
    return this.http.get(`${this.getByIdUrl}/${id}`);
  }
  
  public  postBug(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`,
    });
    return <Observable<any>>this.http.post<any>(this.postUrl, { headers: headers },data );
  }

}

