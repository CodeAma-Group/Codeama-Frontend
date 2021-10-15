import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../services/challenge.service';
import { Challenge, Data } from './challenge';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-view-challenge-takers',
  templateUrl: './view-challenge-takers.component.html',
  styleUrls: ['./view-challenge-takers.component.css']
})
export class ViewChallengeTakersComponent implements OnInit {
  challenge_takers = []
  constructor(private challengeService: ChallengeService, private router:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   this.spinner.show()
   this.challengeService.getChallenge(this.router.snapshot.params.challengeId)
     .subscribe((res:Data)=> {
        this.challenge_takers = res.data.participants
        this.spinner.hide()
     })
}
}
