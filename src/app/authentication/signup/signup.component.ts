import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	constructor( private spinner:NgxSpinnerService, private _router: Router ) {
		this.spinner.show();
	}

	ngOnInit(): void {
		const token = localStorage.getItem('codeama_auth_token');
		if (token != null) {
			this._router.navigate(['/app']);
		}else{
			this.spinner.hide();
		}
	}

	// @Output() modeChange:EventEmitter<any> = new EventEmitter()

	// modeChangeChild() {
	//   alert("this works")
	//   this.modeChange.emit()
	// }

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
			root.style.setProperty('--mainWhite2', '#ffffff')
			root.style.setProperty('--dimBlue', '#66A5F0')
			root.style.setProperty('--dimerBlue', '#f2f6fa')
			root.style.setProperty('--mainBlack', '#17202A')
			root.style.setProperty('--inputWhite', '#ffffff')     
			root.style.setProperty('--contBgLight', 'rgba(66, 144, 237, .1)')
			root.style.setProperty('--questBg','#F7F9FC')
			root.style.setProperty('--bgBlue', '#F4F7FB')
			root.style.setProperty('--minorProfileWhite', '#FCFDFE')
			root.style.setProperty('--shareBg', '#F7FAFC')
			root.style.setProperty('--pureBlack', '#000000')
			root.style.setProperty('#000000', '#000000') 

			document.cookie = "isDark=false; path=/; max-age=" + 365*24*60*60;
		} else {
			let root = document.documentElement;
			root.style.setProperty('--mainBlack', '#ffffff')
			root.style.setProperty('--contBgLight', '#151829')
			root.style.setProperty('--questBg',"rgba(0, 0, 0, 0.178)")
			root.style.setProperty('--modeDimBlue', '--dimBlue')
			root.style.setProperty('--mainWhite2', '#0D0E1A')
			root.style.setProperty('--pureWhite', '#0D0E1A')
			root.style.setProperty('--dimBlue', '#1D2747')
			root.style.setProperty('--dimerBlue', '#0F111E')
			root.style.setProperty('--mainBlack', '#ffffff')
			root.style.setProperty('--inputWhite', '#141B30')
			root.style.setProperty('--contBgLight', '#151829')
			root.style.setProperty('--questBg',"rgba(0, 0, 0, 0.178)")
			root.style.setProperty('--bgBlue', '#151829')
			root.style.setProperty('--minorProfileWhite', '#0F111E')
			root.style.setProperty('--shareBg', '#0F111E')
			root.style.setProperty('--pureBlack', '#ffffff')
			root.style.setProperty('#000000', '#ffffff')

			document.cookie = "isDark=true; path=/; max-age=" + 365*24*60*60;
		}

	}
	maintenancePhase: boolean = false;

	maintenancePhaseChanger() {
		this.maintenancePhase = !this.maintenancePhase;
	}

}
