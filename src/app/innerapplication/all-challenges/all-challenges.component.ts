import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChallengeService } from '../services/challenge.service';
import { Data } from '../view-challenges/challenge';
import { AuthService } from 'src/app/authentication/_authServices/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-all-challenges',
  templateUrl: './all-challenges.component.html',
  styleUrls: ['./all-challenges.component.css']
})
export class AllChallengesComponent implements OnInit {

  constructor(private projects:ProjectService,private spinner:NgxSpinnerService, private challengeService: ChallengeService, private authService: AuthService) { }

  id=10;
  url="https://codeama-backend.onrender.com"
  show:boolean=false
  image;
  challenges:any = []
  technologies = ['React', 'NodeJs', 'Docker', 'Mysql']
  userRole
  showAddChallenge:boolean = false

  ngOnInit(): void {
    this.spinner.show()
    this.challengeService.getChallenges()
    .subscribe((res:any)=> {
       this.challenges = res.data.docs
       console.log('challenges',this.challenges)
       this.spinner.hide()
    })
    
    let token = this.authService.getToken()
      let tokenData:any = jwt_decode(token)
    this.userRole = tokenData.Badge;
    
    if (this.userRole === 'admin') {
      this.showAddChallenge = true
    }
      
  }

}
