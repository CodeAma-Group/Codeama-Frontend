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
  checkBadge(badge: string){
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      default: className="beginner"
    }
    return className
  }
}
