import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeamas',
  templateUrl: './codeamas.component.html',
  styleUrls: ['./codeamas.component.css']
})
export class CodeamasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  componentText = "codeamas works!";
  heading = "Codeama amas";

}
