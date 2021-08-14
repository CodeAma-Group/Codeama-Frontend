import { Component, OnInit } from '@angular/core';
import { ChallengeTakersService } from '../services/challenge-takers.service';
import { Challenge, Data } from './challenge';

@Component({
  selector: 'app-view-challenge-takers',
  templateUrl: './view-challenge-takers.component.html',
  styleUrls: ['./view-challenge-takers.component.css']
})
export class ViewChallengeTakersComponent implements OnInit {
  challenge_takers = []
  constructor(private challengeTakersService: ChallengeTakersService) { }

  ngOnInit(): void {
    
   this.challengeTakersService.getChallenge("611267551a1c981ab0766662")
     .subscribe((res:Data)=> {
        this.challenge_takers = res.data.participants
     })
}
}
