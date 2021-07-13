import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

@Component({
	selector: 'app-signupform',
	templateUrl: './signupform.component.html',
	styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {

	registerForm: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;

	constructor(

		private formBuilder: FormBuilder,
		// private router: Router,

	) { }

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			username: [ '' , [ Validators.required, Validators.email ]],
			email: [ '' , Validators.required],
			password: [ '' , [Validators.required, Validators.minLength(6)] ],
			agree: [ '' , Validators.required],
		});
	}

	get f() { 
		return this.registerForm.controls
	}

	onSubmit() {
		this.submitted = true;

		this.loading = true;
	}

}
