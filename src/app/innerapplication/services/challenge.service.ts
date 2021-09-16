import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../view-challenges/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http:HttpClient) { }

  getChallenge(challengeId:string) {
    return this.http.get(`https://codeama-backend.herokuapp.com/challenges/${challengeId}`)
  }
}
