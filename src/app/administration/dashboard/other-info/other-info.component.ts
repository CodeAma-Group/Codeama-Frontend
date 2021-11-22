import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css']
})
export class OtherInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  topAmas = [
    {
      name: "Nkubito Pacis",
      email: "nkubitopacis@gmail.com",
      profile: "../../assets/images/Rectangle 261.png"
    },

    {
      name: "Abi Seth",
      email: "nkubitopacis@gmail.com",
      profile: "../../assets/images/Rectangle 262.png"
    },

    {
      name: "Ineza Chance",
      email: "nkubitopacis@gmail.com",
      profile: "../../assets/images/profile_pic.png"
    }
  ]

}
