import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeTakersService {

  constructor(private http:HttpClient) { }

  getChallenge(challengeId:string) {
    return this.http.get(`https://codeama-backend.onrender.com/challenges/${challengeId}`)
  }
}
