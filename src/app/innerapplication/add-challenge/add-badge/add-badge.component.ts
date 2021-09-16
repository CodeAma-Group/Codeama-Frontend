import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-badge',
  templateUrl: './add-badge.component.html',
  styleUrls: ['./add-badge.component.scss']
})
export class AddBadgeComponent implements OnInit {

  @Input() prizeIndex:Number
  @Input() status:string
  constructor() { }

  ngOnInit(): void {
  }

}
