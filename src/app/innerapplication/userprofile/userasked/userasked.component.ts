import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../../appsettings.service'
import { AuthService } from '../../../authentication/_authServices/auth.service'
import jwt_decode from 'jwt-decode'
import { InnerapplicationService } from '../../innerapplication.service';
@Component({
	selector: 'app-userasked',
	templateUrl: './userasked.component.html',
	styleUrls: ['./userasked.component.scss']
})
export class UseraskedComponent implements OnInit {

	constructor(private backendService: InnerapplicationService, private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }

	questions: any;
	_id: string;

	noQuestionStatus: boolean = false;
	loadingData: boolean = true;
	Username: string = '';
	devbadge: string = '';
	devpic: string = '';
  
	ngOnInit(): void {
		let token:any = localStorage.getItem('codeama_auth_token');
		let user:any = jwt_decode(token);

		this._id = user._id;

    // this._id = this.activatedRoute.snapshot.paramMap.get('user');
    // console.error(this._id)
		
		this._settings.settings();
		this._settings.settings();
		this._userService.getUserEntireProfileData(this._id).subscribe((res: any) => {
		  this.Username = res.data.Username;
		  this.devbadge = res.data.Badge;
		  this.devpic = res.data.profilePicture;
		})
	
		this._userService.getAskedQuestionsBySingleUser().subscribe((res: any) => {
			this.questions = res.data
			console.log(this.questions)

			this.loadingData = false;

			if (this.questions.length == 0) {
				this.noQuestionStatus = true;
			}
		})
	}

	public answerQuestionLink:string = "app/answer-question?qtnId="
	checkBadge(badge: string){
	  let className:string = ""
	  switch(badge.toLowerCase()){
		case "absolute beginner": className = "absBeg";
		  break;
		case "intermediate": className = "interm";
		  break;
		case "pro": className = "pro";
		 break;
		default: className="beginner"
	  }
	  return className
	}

}
