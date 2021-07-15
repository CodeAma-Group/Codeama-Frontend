import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../_authServices/auth.service'

@Component({
	selector: 'app-signupform',
	templateUrl: './signupform.component.html',
	styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {

	submitted: boolean = false;
	loading: boolean = false;

	constructor(
		
		private _auth: AuthService,
		private _router: Router,

	) { }

	ngOnInit(): void {
		
	}

	errors: string = ''
	isThereErrors: boolean = false
	hasSubmitted: boolean = false

	getUserData(data: any) {
		this.hasSubmitted = true

		this._auth.registerUser(data).subscribe(
			res => {
				console.log(res);  
				this._router.navigate(['/auth/verifyemail']);   
			},
			err => {
				this.isThereErrors = true;
				this.hasSubmitted = false
				this.errors = err.error;
			}
		)
		
	}

}
