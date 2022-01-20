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
  @Input() prizes: any
  @Output() marks = new EventEmitter<Number>()
  @Output() prizeStatuses = new EventEmitter<String>()
  @Output() prizesArr = new EventEmitter<any>() 



  addMarks(value: Number) {
    if(value === null || value === undefined) {
      alert('Please enter value')
      return 
    }
    this.marks.emit(value)
    this.marksInput.blur()
  }

  addStatus(value: String) {
    if(value === null || value === undefined) {
      alert('Please enter value')
      return 
    }
    this.prizeStatuses.emit(value)
  }

  removePrize() {
    if (this.prizes) {
      console.log(`${this.status} Badge`)
      this.prizes = this.prizes.filter((value, index, array) => value.prize !== `${this.status} Badge`)
      console.log(this.prizes)
      this.prizesArr.emit(this.prizes)
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  setDate() {
    return new Date(Date.now())
  }

}
