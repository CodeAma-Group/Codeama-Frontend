import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/_authServices/auth.service'
import { UserService } from '../../innerapplication/services/user.service'
import { AdministrationService } from '../administration.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  userId:any;
  notifications:any = [];

  constructor(private authService: AuthService,private _userService: UserService,private administrationService: AdministrationService) { }

  ngOnInit(): void {

    var token = this.authService.getToken()
    if(token == null){
      this.authService.logout();
    }
    else{
      let tokenData:any = jwt_decode(token)
      this.userId = tokenData._id;
      
      this.administrationService.getAdminNotifications().subscribe(res => {
         this.notifications = res.data;
         console.log("Notfications: ")
         console.log(res.data[0].Description)
      })
  }

  }
  componentText = "Notifications Works!"
  heading = "Notifications"
}