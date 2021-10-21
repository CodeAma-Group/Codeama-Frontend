import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../../appsettings.service'
import { AuthService } from '../../../authentication/_authServices/auth.service'
import { InnerapplicationService } from '../../innerapplication.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-userarticles',
  templateUrl: './userarticles.component.html',
  styleUrls: ['./userarticles.component.scss']
})
export class UserarticlesComponent implements OnInit {

  constructor(private backendService: InnerapplicationService, private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }

  articles: any;
  _id: string;

  loadingData: boolean = true;
  noArticlesStatus: boolean = false;

  Username: string = ''

  ngOnInit(): void {
    
    let token:any = localStorage.getItem('codeama_auth_token');
		let user:any = jwt_decode(token);

		this._id = user._id;

    // this._id = this.activatedRoute.snapshot.paramMap.get('user');
    // console.error(this._id)
   
    this._settings.settings();
    this._userService.getUserEntireProfileData(this._id).subscribe((res: any) => {
      this.Username = res.data.Username;
    })

    this._userService.getUserArticles().subscribe((res: any) => {
      this.articles = res.data
      console.log(this.articles)
      this.loadingData = false;
      if (this.articles.length == 0) {
        this.noArticlesStatus = true;
      }
    })
  }

  seeArticle(value: any) {
    this.router.navigate(['/app/view-article/', value])
  }

}
