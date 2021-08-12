import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  getUrl = 'https://codeama-backend.herokuapp.com/all_bugs';
  getByIdUrl = 'https://codeama-backend.herokuapp.com/viewBug';
  postUrl = 'https://codeama-backend.herokuapp.com/post_bug';
  postCommentUrl = 'https://codeama-backend.herokuapp.com/answerPostedBug';
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
}
