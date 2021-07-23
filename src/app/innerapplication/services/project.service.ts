import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  saveProject(data) {
    return this.http.post('https://codeama-backend.herokuapp.com/project', data);
  }
}
