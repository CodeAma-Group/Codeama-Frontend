import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../appsettings.service'
import { AuthService } from '../../authentication/_authServices/auth.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private _settings: AppsettingsService, private _userService: UserService, private router: Router) { }
  
  editBio: boolean = false;
  editStack: boolean = true;
  editStackTwo: boolean = false;
  editSkills: boolean = true;

  userData: any;
  Badge: string = ''
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
  faceRecognitionPicture: string = ''
  profilePicture: string = ''
  __v: number;
  _id: string = ''

  ngOnInit(): void {

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
      this.connections = this.userData.data.connections;
      this.Skills = this.userData.data.Skills;
      this.Followers = this.userData.data.Followers;
      this.Following = this.userData.data.Following;
      this.faceRecognitionPicture = this.userData.data.faceRecognitionPicture;
      this.profilePicture = this.userData.data.profilePicture
    },
    err => {
      alert("We had trouble loading profile data.");
      this.authService.logout();
      this.router.navigate(['app'])
    })
  }

  showAddBtn() {
    this.editBio = false;
    this.editStack = true;
  }

  showInput() {
    this.editStack = false;
    this.editBio = true;
  }

  showStackTwo() {
    this.editStackTwo = false;
    this.editSkills = true;
  }

  showEditSkill() {
    this.editSkills = false;
    this.editStackTwo = true;
  }

}
