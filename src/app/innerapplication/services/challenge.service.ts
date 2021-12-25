import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../view-challenges/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http:HttpClient) { }

  getChallenges() {
    return this.http.get(`https://codeama-backend.herokuapp.com/challenges?limit=5&page=1`)
  }

  getChallenge(challengeId:string) {
    return this.http.get(`https://codeama-backend.herokuapp.com/challenges/${challengeId}`)
  }

  postChallenge(data) {
    return this.http.post("https://codeama-backend.herokuapp.com/challenges",data)
  }

  updateChallenge(data, challengeId) {
    return this.http.put(`https://codeama-backend.herokuapp.com/challenges/${challengeId}`, data)
  }
}
