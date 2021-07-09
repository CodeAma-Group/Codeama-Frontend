import { Component, OnInit } from '@angular/core';

import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-loginfacereco',
  templateUrl: './loginfacereco.component.html',
  styleUrls: ['./loginfacereco.component.css']
})
export class LoginfacerecoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    document.getElementById("cam").style.display = "none"

    setInterval(() => {
      document.getElementById("cam").style.display = "block"
      document.getElementById("sample").style.display = "none"
    }, 5000)

  }

  webcamImage: WebcamImage = null;

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

}
