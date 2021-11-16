import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private baseUrl = "https://codeama-backend.herokuapp.com/"

  constructor(private http: HttpClient) { }

  public getAllUsers(){
    return <Observable<any>>this.http.get(this.baseUrl + "users/list/all")
}
  public getAllCodeamas(){
    return <Observable<any>>this.http.get(this.baseUrl + "codeama");
}
}