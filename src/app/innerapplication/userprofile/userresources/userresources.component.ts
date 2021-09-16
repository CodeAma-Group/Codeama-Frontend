import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../../appsettings.service'
import { AuthService } from '../../../authentication/_authServices/auth.service'
import jwt_decode from 'jwt-decode'
import { InnerapplicationService } from '../../innerapplication.service';
@Component({
  selector: 'app-userresources',
  templateUrl: './userresources.component.html',
  styleUrls: ['./userresources.component.scss']
})
export class UserresourcesComponent implements OnInit {

  constructor(private backendService: InnerapplicationService, private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }

	articles: any;
	_id: string;
  
	ngOnInit(): void {
		
    let token:any = localStorage.getItem('codeama_auth_token');
		let user:any = jwt_decode(token);

		this._id = user._id;

    // this._id = this.activatedRoute.snapshot.paramMap.get('user');
    // console.error(this._id)
		this._settings.settings();
	
		this.backendService.getQuestions().subscribe((data: any[]) => {
			this.articles = data
		})
	}

}
