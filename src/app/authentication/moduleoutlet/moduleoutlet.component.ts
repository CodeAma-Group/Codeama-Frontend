import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-moduleoutlet',
	templateUrl: './moduleoutlet.component.html',
	styleUrls: ['./moduleoutlet.component.css']
})
export class ModuleoutletComponent implements OnInit {

	constructor( private _router: Router) { }

	ngOnInit(): void {
		const token = localStorage.getItem('codeama_auth_token');
		if (token != null) {
			this._router.navigate(['/app']);
		}
	}

}
