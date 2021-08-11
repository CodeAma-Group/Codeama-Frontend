import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class FaceauthService {

	constructor( private http: HttpClient ) { }

	startProcess() {
		document.getElementById("cam").style.display = "none"
		document.getElementById("scanner").style.display = "none";

		setInterval(() => {
		  document.getElementById("cam").style.display = "block"
		  document.getElementById("sample").style.display = "none"
		}, 5000)
	}

	getFaceImages() {
		return this.http.get('https://codeama-backend.herokuapp.com/faceRecognitionPictures');
	}

}
