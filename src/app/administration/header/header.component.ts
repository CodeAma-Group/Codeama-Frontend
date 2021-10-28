import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  
  ngOnInit(): void {
  }
  @Input() headerText: string;
  toggleFullScreen(){
    if( window.innerHeight == screen.height) {
      let elem:any = document;
      elem.exitFullscreen()
    }else{
      let elem:any =  document.body; 
      let methodToBeInvoked = elem.requestFullscreen || 
       elem.webkitRequestFullScreen || elem['mozRequestFullscreen'] || 
       elem['msRequestFullscreen']; 
      if(methodToBeInvoked) methodToBeInvoked.call(elem);
    }
  }
  show:boolean = true;
}
