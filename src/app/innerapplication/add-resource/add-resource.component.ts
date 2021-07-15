import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
      resourceKind: ["...",[]],
      resourceLink: ["",[]]
    })
   }
  ngOnInit(): void {
  }

  public submitRes(e: Event){
    e.preventDefault();
    console.log(this.resource.value)
  }

}
