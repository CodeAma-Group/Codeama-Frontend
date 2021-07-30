import { Injectable, Injector } from '@angular/core';

import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service'

@Injectable({
  	providedIn: 'root'
})

export class AuthinterceptorService implements HttpInterceptor{

  	constructor(
		private injector: Injector
	) { }

	intercept(req, next) {
		let authService = this.injector.get(AuthService);
		let tokenizedReq = req.clone({
			setHeaders: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
				// Authorization: 'Bearer '+authService.getToken(),
				codeama_auth_token: authService.getToken()
			}
		})

		return next.handle(tokenizedReq);
	}

}
