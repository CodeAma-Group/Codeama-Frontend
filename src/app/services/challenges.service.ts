import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  constructor(private http: HttpClient) {}
  getData(){
    let url = 'https://localhost:8711/challenges'
    return this.http.get(url);
  }
}
