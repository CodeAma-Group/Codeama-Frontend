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
                            "facebook": `${this.userData.data.connections.facebook}` }
      this.Skills = [...this.userData.data.Skills];
      this.Followers = this.userData.data.Followers;
      this.Following = this.userData.data.Following;
      this.coverPicture = this.userData.data.coverPicture;
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

  accountSettings() {
    this.editingAccountSettings = !this.editingAccountSettings;
  }

  accountMinorSettings() {
    this.editingMinorAccountSettings = !this.editingMinorAccountSettings;
  }

  imageUrl: any;

  updateProfle(file) {
    let newProfile: any = file.target.files[0]
    if(file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = async (file) => {
        this.imageUrl = await file.target.result;
        this.profilePicture = this.imageUrl;

        var userData:any = new FormData();
        
        userData.append("userId", `${this._id}`)
        userData.append("Badge", `${this.Badge}`)
        userData.append("Bio", `${this.Bio}`)
        userData.append("Location", `${this.Location}`)
        userData.append("description", `${this.description}`)
        userData.append("connections", this.connections)
        userData.append("Skills", "react,angular,vue")
        // userData.append("coverPicture", file.target.files[0])
        userData.append("profilePicture", newProfile)
        
        

        this.updateProfileToDb(userData);
      }
    }
  }

  updateCoverPic(file) {
    let newProfile: any = file.target.files[0]
    if(file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = async (file) => {
        this.imageUrl = await file.target.result;
        this.coverPicture = this.imageUrl;

        var userData:any = new FormData();
        
        userData.append("userId", `${this._id}`)
        userData.append("Badge", `${this.Badge}`)
        userData.append("Bio", `${this.Bio}`)
        userData.append("Location", `${this.Location}`)
        userData.append("description", `${this.description}`)
        userData.append("connections", this.connections)
        userData.append("Skills", "react,angular,vue")
        // userData.append("coverPicture", file.target.files[0])
        userData.append("profilePicture", newProfile)
        
        

        this.updateProfileToDb(userData);
      }
    }
  }

  updateProfileToDb(data) {
    console.log(data)
    this._userService.updateProfile(data).subscribe(
			res => {
				console.warn(res);
        
			},
			err => {
        console.log(err)
			}
  )}



}
