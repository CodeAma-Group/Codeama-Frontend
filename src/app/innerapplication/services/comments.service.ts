import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class commentsService {
  private base: string = "https://codeama-backend.herokuapp.com/"

  constructor(private http: HttpClient) {}
  public commentOnProject(body){
    return this.http.post<Observable<any>>(this.base + "comment", body)
  }
  
  public getProjectComments(id){
    return this.http.get<Observable<any>>(this.base + "comment/"+id)
  }
}
