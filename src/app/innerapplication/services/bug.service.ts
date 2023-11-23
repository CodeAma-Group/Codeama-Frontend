import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  private base: string = "https://codeama-backend.onrender.com/"
  getUrl = 'https://codeama-backend.onrender.com/all_bugs';
  getByIdUrl = 'https://codeama-backend.onrender.com/viewBug';
  postUrl = 'https://codeama-backend.onrender.com/post_bug';
  postCommentUrl = 'https://codeama-backend.onrender.com/answerPostedBug';
  constructor(private http: HttpClient) {}
  auth_token = localStorage.getItem('codeama_auth_token');
  getBugs() {
    return this.http.get(this.getUrl);
  }

  getBug(bugId, posterId) {
    return this.http.get(`${this.getByIdUrl}/${bugId}/${posterId}`);
  }

  public postBug(data) {
    return <Observable<any>>this.http.post(this.postUrl, { bug: data });
  }
  public postComment(data) {
    return <Observable<any>>this.http.post(this.postCommentUrl, { comments: data })
  }

  public commentBug(body){
    return this.http.post<Observable<any>>(this.base + "comment", body)
  }
  
  public viewBugComments(id){
    return this.http.get<Observable<any>>(this.base + "comment/"+id)
  }
}
