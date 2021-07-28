import { Component, OnInit } from '@angular/core';
import {ChallengesService} from '../../services/challenges.service'

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  constructor(private challenge:ChallengesService) { }
  primary = 'primary';
  success = 'success';
  danger = 'danger'
  warning = 'warning'

  prime = '#E1EBFB'
  succ = '#E1F8EE'
  dan = '#F5E4ED'
  warn = ' #F5F6E7'
  ngOnInit(): void {
  }
}
