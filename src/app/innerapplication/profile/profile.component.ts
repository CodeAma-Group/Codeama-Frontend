import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../appsettings.service'
import { AuthService } from '../../authentication/_authServices/auth.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    
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
      this.authService.logout();
      this.router.navigate(['app'])
    })
  }

  showAddBtn(value: string) {
    this.editBio = false;
    this.editStack = true;

    var userDataBio:any = new FormData();
    userDataBio.append("Bio", `${value}`);
    this.Bio = value;

    this.error_msg = 'Bio failed to update. Try again!'
    this.success_msg = 'Bio updated successfully!'
 
    this.updateProfileToDb(userDataBio);
  }

  showInput() {
    this.editStack = false;
    this.editBio = true;
  }

  showStackTwo() {
    this.editStackTwo = false;
    this.editSkills = true;

    if (this.skillVal != '') {
      this.Skills.push(this.skillVal);

      var userData:any = new FormData();
      // this.description = " ";
      // this.Bio = " ";
      // this.Location = " ";
      // let token: any = localStorage.getItem('codeama_auth_token')
      // userData.append("Authorization", `${token}`)
      // userData.append("Badge", `${this.Badge}`)
      userData.append("Bio", `${this.Bio}`)
      userData.append("Location", `${this.Location}`)
      userData.append("description", `${this.description}`)
      userData.append("Skills", `${this.Skills}`)

      this.error_msg = 'Profile failed to update. Try again!'
      this.success_msg = 'Profile picture updated successfully!'
   
      this.updateProfileToDb(userData);
    }
  }

  skillVal: string = '';
  getSkill(value: string) {
    this.skillVal = value;
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

        let userData:any = new FormData();
        
        // userData.append("userId", `${this._id}`)
        // userData.append("Badge", `${this.Badge}`)
        // userData.append("Bio", `${this.Bio}`)
        // userData.append("Location", `${this.Location}`)
        // userData.append("description", `${this.description}`)
        // userData.append("Skills", "react,angular,vue")
        // userData.append("coverPicture", file.target.files[0])
        userData.append("profilePicture", newProfile)
        this.error_msg = 'Profile failed to update. Try again!'
        this.success_msg = 'Profile picture updated successfully!' 

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
        
        // userData.append("userId", `${this._id}`)
        // userData.append("Badge", `${this.Badge}`)
        // userData.append("Bio", `${this.Bio}`)
        // userData.append("Location", `${this.Location}`)
        // userData.append("description", `${this.description}`)
        // userData.append("connections", this.connections)
        // userData.append("Skills", "react,angular,vue")
        userData.append("coverPicture", newProfile)
        // userData.append("profilePicture", newProfile)
        this.error_msg = 'Profile failed to update. Try again!'
        this.success_msg = 'Profile picture updated successfully!' 

        this.updateProfileToDb(userData);
      }
    }
  }

  error_msg: string = '';
  success_msg: string = '';

  updateProfileToDb(data) {
    this._userService.updateProfile(data).subscribe(
			res => {
        this.editingMinorAccountSettings = false;
        this.editingAccountSettings = false;
        this.notifier.notify("success", this.success_msg);
        this.hasSubmitted = false;   
        this.hasSubmittedMinorChanges = false;   
        this.editingAccountSettings = false;
        // this.router.navigate(['/app/profile/', this._id])

        // location.reload();
      },
			err => {
        this.hasSubmitted = false; 
        this.hasSubmittedMinorChanges = false;      
        this.notifier.notify("error", this.error_msg);        
      }
  )}

  newusername: string = '';
  newpassword: string = '';
  oldpassword: string = '';
  hasSubmitted: boolean = false;

  getUsernameToChangeTo(value: string) {
    this.newusername = value;
  }

  getCurrentPassword(value: string) {
    console.log(value)
  }

  getNewPassword(value: string) {
    console.log(value)
  }

  updateProfileFields() {
    this.hasSubmitted = true;
    let userImportantData:any = new FormData();

    // if (this.newusername != '') {
    //   userData.append("Username", this.newusername);
    //   this.error_msg = 'Username failed to update. Try again!'
    //   this.success_msg = 'Username updated successfully!' 
    //   this.updateProfileToDb(userData);
    // }

  }

  hasSubmittedMinorChanges: boolean = false;
  getUserMinorData(data: any) {
    this.hasSubmittedMinorChanges = true;
   
    let userData:any = new FormData();
    // this.description = " ";
    // this.Bio = " ";
    // this.Location = " ";
    var connections: any = { 
      "github": `${data.github}`, 
      "twitter": `${data.twitter}`, 
      "portfolio": `${data.portfolio}` 
    }
      
    // userData.append("userId", `${this._id}`)
    userData.append("Location", `${data.Location}`)
    userData.append("Bio", `${data.Bio}`)
    userData.append("connections", JSON.stringify(connections))
    userData.append("description", `${data.description}`)

    this.error_msg = 'Profile failed to update. Try again!'
    this.success_msg = 'Profile picture updated successfully!'
 
    this.updateProfileToDb(userData);
  }

  hoveredSkill: string = '';
  hoverSkill(val: any) {
    this.hoveredSkill = val;
  }

  leaveSkill() {
    this.hoveredSkill = "";
  }

  removeSkill(index: any, skill: any) {
    if (this.Skills.includes(skill)) {
      const filtered_arr = this.Skills.filter(val => val !== skill);
      this.Skills = filtered_arr;

      var userData:any = new FormData();
      userData.append("Skills", `${filtered_arr}`)

      this.error_msg = 'Skills failed to update. Try again!'
      this.success_msg = 'Skills updated successfully!'
    
      this.updateProfileToDb(userData);
    }
    this.hoveredSkill = '';
  }

}
