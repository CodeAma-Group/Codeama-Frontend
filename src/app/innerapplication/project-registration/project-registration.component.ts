import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css'],
})
export class ProjectRegistrationComponent implements OnInit {
  selectedFile = null;
  constructor() {}
  imgUrl: string ="";
  videoUrl:string="../../../assets/images/video.mp4"
  // ../../../assets/images/image1.png
  
  fileSelected(event) {
    this.selectedFile = event.target.files[0].name;
    // console.log(new Date()+this.selectedFile);
    console.log(event.timeStamp+this.selectedFile);

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        // this.imgUrl = event.target.result;
        this.videoUrl = event.target.result;
      };
    }
  }
  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
  }
  ngOnInit(): void {}
}
