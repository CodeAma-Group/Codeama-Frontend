import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/innerapplication/services/user.service';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.css']
})
export class OurUsersComponent implements OnInit {
  constructor(private administrationService: AdministrationService, private userService: UserService) { }
  userProfileData: String;
  users: any = [];
  loader: boolean = true;
  selectedUser:boolean = true;
  ngOnInit(): void {
    this.getAllUsers();
    this.badgeHolderNumber("beginner");
  }

  getAllUsers() {
    this.administrationService.getAllUsers().subscribe(res => {
      this.users = res.data;
      console.log(res.data);
      this.loader = false;
    })
  }
  checkBadge(badge: string) {
    console.log(badge);
    let className: string = ""
    switch (badge.toLowerCase()) {
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
        break;
      case "admin": className = "admin"; break;
      case "beginner": className = "beginner"; break;
    }
    return className
  }
  badgeHolderNumber(badge: string){
    let count:number = 0;
    console.log(this.users.Badge);
    for(let i=0; i<this.users.length; i++){
        if(this.users[i].Badge == badge){
          count++;
        }
    }
    console.log(count);
    return count;
  }
  allUsersNumber(){
    let usersTotal = this.users.length;
    return usersTotal;
  }
  p: number = 1;
  componentText = "our users works!"
  heading = "Codeama users"
}