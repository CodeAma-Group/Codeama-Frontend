import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugService } from '../../services/bug.service';
@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css'],
})
export class AddBugComponent implements OnInit {
  constructor(private bugs: BugService) {}
  newBugForm = new FormGroup({
    bugTitle: new FormControl(''),
    bugTechnology: new FormControl(''),
    bugDetails: new FormControl(''),
    bugDescription: new FormControl(),
  });

  ngOnInit(): void {}
  collectData() {
    console.log(this.newBugForm.value);
    this.bugs.postBug(this.newBugForm.value).subscribe((res)=>{
      console.log("data",res);
    })
  }
}
