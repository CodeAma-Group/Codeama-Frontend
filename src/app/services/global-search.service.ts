import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  constructor(private http:HttpClient) { }
  url = 'https://codeama-backend.herokuapp.com/all_bugs'
  getData(){
    this.http.get(this.url).subscribe(data => console.log(data));
  }
}
 
