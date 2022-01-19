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
    if(this.prizes) {
      this.prizes = this.prizes.filter((value, index, array) => { return value.status === 'admin' })
      console.log(this.prizes)
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  setDate() {
    return new Date(Date.now())
  }

}
