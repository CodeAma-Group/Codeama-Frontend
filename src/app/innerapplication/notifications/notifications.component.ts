import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notifications:NotificationService) { }
  id=10;
  notnull:boolean = false;
  url="https://codeama-backend.herokuapp.com"
  show:boolean=false
  image;
  notificationData:any

  codeamaData:any

  ngOnInit(): void {

    this.notifications.getNotifications().subscribe((res)=>{
      this.notificationData=res;
      this.notificationData=this.notificationData.data;
      this.image=this.url+'/'+this.notificationData[0].demo;
      this.show=true;
      this.notnull = true;
    })

  }

}