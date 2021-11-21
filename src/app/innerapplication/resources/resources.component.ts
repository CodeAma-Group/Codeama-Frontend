import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public resources: any[] 
  public userData: any
  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private _userService: UserService) { 
    this.spinner.show()
    let decoded: any = jwt_decode(localStorage.codeama_auth_token)
    this._userService.getUserEntireProfileData(decoded._id).subscribe((res: any) => {
      this.userData = res.data
    })
    this.backendService.getResources().subscribe(data => {
      this.resources=data
      this.spinner.hide()
    })
  }

  ngOnInit(): void {
  }

  public checkResourceType(type: string){ 
    if(type == "Youtube video" || type=="Youtube Video"){`  `
      return "youtube video"
    }
    else if(type == "Article"){
      return "article"
    }
  }
  checkBadge(badge: string){
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      default: className="beginner"
    }
    return className
  } 
  addRemoveLike(id: string, index: number){
    this.backendService.likeUnlikeResource(id).subscribe()
    if((this.resources[index].resourceDetails.Likes).includes(this.userData._id)){
      this.resources[index].resourceDetails.Likes = this.resources[index].resourceDetails.Likes.filter(userid => this.userData._id!=userid)
    }
    else {
      this.resources[index].resourceDetails.Likes.push(this.userData._id)
    }
  }
}
