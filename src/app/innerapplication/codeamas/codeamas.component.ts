import { Component, OnInit } from '@angular/core';
import { CodeamaService } from '../services/codeama.service';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

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


  ngOnInit(): void {
    
    this.codeama.getcodeamas().subscribe((res)=>{
      this.codeamaData=res
      this.codeamaData=this.codeamaData.data
      this.user = this.codeamaData.codeama
      this.show=true

      this.follower = this.codeamaData._id;
    })

    this.codeama.patch(this.follower).subscribe((res) => {
      console.log("Esther ");
      console.log(this.follower)
      console.log(res);
    })

  }

  selectfollower(data){
    this.follower = Object.assign({}, data);
    this.originalUser = data;
  }
    
}
