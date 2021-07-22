import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  public resource;
  constructor(private formBuilder: FormBuilder) {
    this.resource = this.formBuilder.group({
      title: ["",[]],
      desc: ["",[]],
      resourceKind: ["Youtube Video",[]],
      resourceLink: ["",[]],
      resourcePicture: ["",[]]
    })
   }
  ngOnInit(): void {
  }

  public submitRes(e: Event){
    e.preventDefault();
    let decoded: any = jwt_decode(localStorage.codeama_auth_token)
    let newArt = {
      ownerId: decoded._id,
      title: this.resource.value.title,
      resourceType: this.resource.value.resourceKind,
      description: JSON.stringify({description: this.resource.value.desc}),
      link: this.resource.value.resourceLink,
      resourcePicture: this.resource.value.resourcePicture
    }
    console.log(newArt)
  }

}
