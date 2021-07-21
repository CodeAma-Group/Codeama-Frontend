import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../_authServices/auth.service';

@Component({
	selector: 'app-signupform',
	templateUrl: './signupform.component.html',
	styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {

	regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	errors: string = '';
	isThereErrors: boolean = false;
	hasSubmitted: boolean = false;

	requiredUsername: boolean = false;
	requiredEmail: boolean = false;
	requiredPassword: boolean = false;
	invalidUsername: boolean = false;
	invalidEmail: boolean = false;
	invalidPassword: boolean = false;
	agreed: boolean = false;
	invalidTerms: boolean = false;

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

	validateUsername(value: string) {
		if (this.requiredUsername) {
			if (value.length > 0) {
				this.requiredUsername = false;
			}
		}
	}

	agreedToTerms() {
		this.agreed = !this.agreed;

		if (this.invalidTerms) {
			this.invalidTerms = false;
		}
	}

	getUserData(data: any) {

		if (data.Username == "" || data.Email == "" || data.Password == "") {

			if (data.Username == "") {
				return this.requiredUsername = true;
			}

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

		if (!this.agreed) {
			return this.invalidTerms = true;
		}

		this.hasSubmitted = true;

		this._auth.registerUser(data).subscribe(
			res => {
				console.log(data)
				this._router.navigate(['/auth/verifyemail']);
			},
			err => {
				this.isThereErrors = true;
				this.hasSubmitted = false;
				this.errors = err.error;
			}
		)
	}

}
