import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/innerapplication/services/user.service';
import { AdministrationService } from '../administration.service';
@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor(private administrationService: AdministrationService, private userService: UserService) { }
  userProfileData: String;
  users: any = [];
  loader: boolean = true;
  selectedUser:boolean = true;
  ngOnInit(): void {
    this.getAllCodeamas();
    this.badgeHolderNumber("beginner");
  }

  getAllCodeamas() {
    this.administrationService.getAllCodeamas().subscribe(res => {
      this.users = res.data;
      console.log(res.data);
      this.loader = false;
    })
  }
  count(followArr: []){
    let count;
    count = followArr.length;
    return count;
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
