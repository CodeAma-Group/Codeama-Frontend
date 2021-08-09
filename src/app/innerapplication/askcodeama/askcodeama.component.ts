import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';

@Component({
  selector: 'app-askcodeama',
  templateUrl: './askcodeama.component.html',
  styleUrls: ['./askcodeama.component.css']
})
export class AskcodeamaComponent implements OnInit {

  constructor(private codeama:CodeamaService) { }
  // id=10;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  user;
  badge;
  case;
  codeamaData:any

  originalUser
  follower

  size:number;


  id:number;

  ngOnInit(): void {
    this.codeama.getcodeamas().subscribe((res)=>{
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData.codeama
      this.size = this.codeamaData.codeama.follower.length
      this.show=true

      console.log("array");
      console.log(this.size);
    })

    this.codeama.getcodeama(this.id).subscribe((res)=>{
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData.codeama
      this.size = this.codeamaData.codeama.follower.length
      this.show=true

      console.log("array");
      console.log(this.size);
    })

  }

}
