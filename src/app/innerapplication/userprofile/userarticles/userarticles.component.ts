import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../../appsettings.service'
import { AuthService } from '../../../authentication/_authServices/auth.service'
import { InnerapplicationService } from '../../innerapplication.service';

@Component({
  selector: 'app-userarticles',
  templateUrl: './userarticles.component.html',
  styleUrls: ['./userarticles.component.scss']
})
export class UserarticlesComponent implements OnInit {

  constructor(private backendService: InnerapplicationService, private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }

  articles: any;
  _id: string;

  ngOnInit(): void {
    
    this._id = this.activatedRoute.snapshot.params.username;
   
    this._settings.settings();

    this.backendService.getArticles().subscribe((data: any[]) => {
      this.articles = data
    })
  }

}
