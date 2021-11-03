import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css']
})
export class CardBoxComponent implements OnInit {
  @Input() card;
  constructor() { }

  ngOnInit(): void {
  }

}
