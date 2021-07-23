import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BugService {
getUrl="https://codeama-backend.herokuapp.com/all_bugs";
getByIdUrl="https://codeama-backend.herokuapp.com/solved_bugs/JJ"
postUrl="https://codeama-backend.herokuapp.com/post_bug";
  constructor(private http:HttpClient) { }
  getBugs(){
    return this.http.get(this.getUrl)
  }
  getBug(id){
    return this.http.get(`${this.getByIdUrl}/${id}`)
  }
  postBug(data){
    return this.http.get(this.postUrl,data)
  }
}
