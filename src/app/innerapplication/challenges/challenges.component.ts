import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChallengeService } from '../services/challenge.service';
import { Data } from '../view-challenges/challenge';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challenge: any= []
  constructor(private challengeService: ChallengeService, private router:ActivatedRoute, private spinner: NgxSpinnerService, private _router: Router) { }
  primary = 'primary';
  success = 'success';
  danger = 'danger'
  warning = 'warning'

  prime = '#E1EBFB'
  succ = '#E1F8EE'
  dan = '#F5E4ED'
  warn = ' #F5F6E7'
  ngOnInit(): void {
    this.challengeService.getChallenge(this.router.snapshot.params.challengeId)
    .subscribe((res:Data)=> {
      this.spinner.show()
      this.challenge = res.data
      }) 
      setTimeout(() => {
        this.spinner.hide()
      }, 1500);
  }

  showSpinner() {
    this.spinner.show()
  }

  getParticipantCount() {
    return this.challenge.participants.length
  }
  
}
