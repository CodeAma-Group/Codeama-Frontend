import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/innerapplication/services/user.service';
import { AdministrationService } from '../administration.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.css']
})
export class OurUsersComponent implements OnInit {
  constructor(private administrationService:AdministrationService, private userService:UserService) { }
  userProfileData:String;
  users:any = [];
  loader:boolean = true;
  ngOnInit(): void {
   this.getAllUsers();
  }

  getAllUsers(){
    this.administrationService.getAllUsers().subscribe(res =>{
       this.users = res.data;
       console.log(res.data);
       this.loader = false;
     })
  }
  checkBadge(badge: string){
    console.log("Here")
    console.log(badge);
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      case "admin": className = "admin";break;
      case "beginner" : className = "beginner"; break;
    }
    return className
  }
  p:number = 1;
  componentText="our users works!"
  heading = "Codeama users"
}