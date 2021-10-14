import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() prize
  @Input() prizeIndex:number

}
