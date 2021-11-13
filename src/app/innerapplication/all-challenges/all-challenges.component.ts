import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChallengeService } from '../services/challenge.service';
import { Data } from '../view-challenges/challenge';

@Component({
  selector: 'app-all-challenges',
  templateUrl: './all-challenges.component.html',
  styleUrls: ['./all-challenges.component.css']
})
export class AllChallengesComponent implements OnInit {

  constructor(private projects:ProjectService,private spinner:NgxSpinnerService, private challengeService: ChallengeService) { }

  id=10;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  image;
  challenges:any = []
  technologies = ['React','NodeJs','Docker','Mysql']

  ngOnInit(): void {
    this.spinner.show()
    this.challengeService.getChallenges()
    .subscribe((res:any)=> {
       this.challenges = res.data.docs
       console.log('challenges',this.challenges)
       this.spinner.hide()
    })
    
  }

}
