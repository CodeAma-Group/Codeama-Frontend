import { Component, OnInit } from '@angular/core';
import{FormControl,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {
  constructor() { }
newBugForm= new FormGroup({
bugTitle: new FormControl(''),
bugTechnology:new FormControl(''),
bugDetails: new FormControl(''),
bugDescription:new FormControl(),

})

  ngOnInit(): void {
  }
collectData(){
  console.log(this.newBugForm.value);
}
}
