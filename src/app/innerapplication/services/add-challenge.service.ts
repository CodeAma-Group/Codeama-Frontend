import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddChallengeService {
  url = 'https://codeama-backend.herokuapp.com/challenges'
  constructor(private httpClient:HttpClient) { }
   
  postChallenge(data) {
    return this.httpClient.post(this.url,data)
  }
}
