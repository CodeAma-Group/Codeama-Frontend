import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';
@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  constructor(private bug:BugService) { }
 bugs:any;
  ngOnInit(): void {
    this.bug.getBugs().subscribe((result)=>{
      this.bugs=result;
      this.bugs=this.bugs.data      
      console.log(this.bugs);
      
    })
  }
}
