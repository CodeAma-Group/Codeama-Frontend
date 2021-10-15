import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-badge',
  templateUrl: './add-badge.component.html',
  styleUrls: ['./add-badge.component.scss']
})
export class AddBadgeComponent implements OnInit {

  marksInput: any = document.getElementById('marks')
  @Input() prizeIndex:any
  @Input() status:string
  @Input() prizes: {}
  @Output() marks = new EventEmitter<Number>()


  addMarks(value: Number) {
    if(value === null || value === undefined) {
      alert('Please enter value')
      return 
    }
    this.marks.emit(value)
    this.marksInput.blur()
  }
  constructor() { }

  ngOnInit(): void {
  }

  setDate() {
    return new Date(Date.now())
  }

}
