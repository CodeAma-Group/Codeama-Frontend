import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class FaceauthService {

	constructor() { }

	startProcess() {
		document.getElementById("cam").style.display = "none"

		setInterval(() => {
		  document.getElementById("cam").style.display = "block"
		  document.getElementById("sample").style.display = "none"
		}, 5000)
	}

}
