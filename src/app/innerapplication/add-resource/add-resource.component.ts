import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import jwt_decode from 'jwt-decode'
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  public resource;
  constructor(private formBuilder: FormBuilder,private notifier: NotifierService,private backendService: InnerapplicationService,private spinner: NgxSpinnerService) {
    this.resource = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["",[Validators.required]],
      resourceKind: ["Youtube Video",[Validators.required]],
      resourceLink: ["",[Validators.required]],
      resourcePicture: ["",[Validators.required]]
    })
   }
  ngOnInit(): void {
  }

  public submitRes(e: Event){
    e.preventDefault();
    this.spinner.show()
    var decoded: any = jwt_decode(localStorage.codeama_auth_token)
    var newArt: FormData = new FormData()
    newArt.append("ownerId", decoded._id)
    newArt.append("title",this.resource.value.title)
    newArt.append("resourceType",this.resource.value.resourceKind)
    newArt.append("description", JSON.stringify({description: this.resource.value.desc}))
    newArt.append("link", this.resource.value.resourceLink)
    newArt.append("resourcePicture", this.resource.value.resourcePicture)
    this.backendService.addQuestion(newArt).subscribe(
      (data) => {
        this.spinner.hide()
        this.notifier.notify("success","Resource posted successfully!" )
    },
    (error) => {
      this.notifier.notify("error","An error occured, try again!")
    }
    )
  }

}
