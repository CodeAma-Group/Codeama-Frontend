import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../_authServices/auth.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

	regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	errors: string = '';
	isThereErrors: boolean = false;
	hasSubmitted: boolean = false;

	requiredEmail: boolean = false;
	requiredPassword: boolean = false;
	invalidEmail: boolean = false;
	invalidPassword: boolean = false;

	constructor(
		private _auth: AuthService,
		private _router: Router,

	) { }

	ngOnInit(): void {

	}

	validatePassword(value: string) {
		if (this.invalidPassword) {
			if (value.length >= 6) {
				this.invalidPassword = false;
			}
		}

		if (this.requiredPassword) {
			if (value.length > 0) {
				this.requiredPassword = false;
			}
		}
	}

	validateEmail(value: any) {
		if (this.invalidEmail) {
			const valid = this.regularExpression.test(String(value).toLowerCase());
			if (!valid) {
				this.invalidEmail = false;
			}
		}

		if (this.requiredEmail) {
			if (value.length > 0) {
				this.requiredEmail = false;
			}
		}
	}

	getUserData(data: any) {
	
		if (data.Email == "" || data.Password == "") {

			if (data.Email == "") {
				return this.requiredEmail = true;
			}

			if (data.Password == "") {
				return this.requiredPassword = true;
			}

			return;
		}

		if (data.Email != "") {
			const valid = this.regularExpression.test(String(data.Email).toLowerCase());
			if (!valid) {
				return this.invalidEmail = true;
			}
		}

		if (data.Password != "") {
			let password = data.Password;
			let len = password.length;

			if (len < 6) {
				return this.invalidPassword = true;
			}
		}

		this.hasSubmitted = true;

		this._auth.loginUser(data).subscribe(
			res => {
				let token = res.token.split(' ')[1];
				localStorage.setItem('codeama_auth_token', token);
				this._router.navigate(['/app']);
			},
			err => {
				this.isThereErrors = true;
				this.hasSubmitted = false;
				this.errors = err.error;
			}
		)

	}
}
