import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../services/challenge.service';
import { Data } from '../view-challenges/challenge';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challenge: any= []
  constructor(private challengeService: ChallengeService) { }
  primary = 'primary';
  success = 'success';
  danger = 'danger'
  warning = 'warning'

  prime = '#E1EBFB'
  succ = '#E1F8EE'
  dan = '#F5E4ED'
  warn = ' #F5F6E7'
  ngOnInit(): void {
    this.challengeService.getChallenge('613f227d482ca6364cc35760')
      .subscribe((res:Data)=> {
         this.challenge = res.data
      }) 
  }

  getParticipantCount() {
    return this.challenge.participants.length
  }

}
