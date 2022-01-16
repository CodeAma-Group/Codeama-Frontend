import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../appsettings.service'
import { AuthService } from '../../authentication/_authServices/auth.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-singleprofile',
  templateUrl: './singleprofile.component.html',
  styleUrls: ['./singleprofile.component.css']
})
export class SingleprofileComponent implements OnInit {

	   
    constructor(private spinner:NgxSpinnerService, private notifier: NotifierService, private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }
  
  editBio: boolean = false;
  editStack: boolean = true;
  editStackTwo: boolean = false;
  editSkills: boolean = true;
  editingAccountSettings: boolean = false;
  editingMinorAccountSettings: boolean = false;

  userData: any;
  Badge: any
  Bio: string = ''
  CreatedAt: string = ''
  Email: string = ''
  Followers: any
  Following: any
  Location: string = ''
  Skills: any
  Username: string = ''
  connections: any
  description: string = ''
  coverPicture: string = ''
  faceRecognitionPicture: string = ''
  profilePicture: string = ''
  __v: number;
  _id: string = ''

  ngOnInit(): void {
    this.spinner.show()

    this._id = this.activatedRoute.snapshot.params.username;
   
    this._settings.settings();

    this._userService.getUserEntireProfileData(this._id).subscribe((res) => {
      this.userData = res;
      this.Badge = this.userData.data.Badge;
      this.Bio = this.userData.data.Bio;
      this.CreatedAt = this.userData.data.CreatedAt;
      this.Email = this.userData.data.Email;
      this.Location = this.userData.data.Location;
      this.Username = this.userData.data.Username;
      this.description = this.userData.data.description;
      this.connections =  { "github": `${this.userData.data.connections.github}`,
                            "twitter": `${this.userData.data.connections.twitter}`,
                            "portfolio": `${this.userData.data.connections.portfolio}` }
      this.Skills = [...this.userData.data.Skills];
      this.Followers = this.userData.data.Followers;
      this.Following = this.userData.data.Following;
      this.coverPicture = this.userData.data.coverPicture;
      this.faceRecognitionPicture = this.userData.data.faceRecognitionPicture;
      this.profilePicture = this.userData.data.profilePicture
      this.spinner.hide()

    },
    err => {
      alert("We had trouble loading profile data.");
      this.router.navigate(['/app'])
    })
  }

}
