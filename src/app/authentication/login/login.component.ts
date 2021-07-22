import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor( private _router: Router ) { }

	ngOnInit(): void {
		const token = localStorage.getItem('codeama_auth_token');
		if (token != null) {
			this._router.navigate(['/app']);
		}
	}

	cookieVal:string = ""

	async modeChange() {
		var cookieName = "isDark";
		var matchCookie = await document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
		if (matchCookie) {
			this.cookieVal = matchCookie[2];
		}
		else{
			// document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
			// this.cookieVal = "false";
			alert("Make sure your cookies are enabled because we use cookies to keep track of your settings on the devices!")
		}

		if (this.cookieVal == "true") {
			let root = document.documentElement;
			root.style.setProperty('--pureWhite', '--pureWhite')
			root.style.setProperty('--mainBlack', '--pureWhite') 
			root.style.setProperty('--dimBlue', '#66A5F0')
			root.style.setProperty('--dimerBlue', '#f2f6fa')
			root.style.setProperty('--mainBlack', '#17202A')
			root.style.setProperty('--inputWhite', '#ffffff') 

			document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
		} else {
			let root = document.documentElement;
			root.style.setProperty('--pureWhite', '#0D0E1A')
			root.style.setProperty('--mainBlack', '#ffffff')
			root.style.setProperty('--dimBlue', '#1D2747')
			root.style.setProperty('--dimerBlue', '#0F111E')
			root.style.setProperty('--mainBlack', '#ffffff')
			root.style.setProperty('--inputWhite', '#141B30')

			document.cookie = "isDark=true; path=/; max-age=" + 365*24*60*60;
		}

	}

}
