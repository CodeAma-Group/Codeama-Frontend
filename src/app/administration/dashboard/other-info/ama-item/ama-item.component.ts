import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-ama-item',
  templateUrl: './ama-item.component.html',
  styleUrls: ['./ama-item.component.css']
})
export class AmaItemComponent implements OnInit {

  @Input() ama;
  @Input() amaIndex;
  constructor() { }

  ngOnInit(): void {
  }

}
