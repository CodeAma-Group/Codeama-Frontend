import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../dashboard/dashboard.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private notifications: NotificationService, private spinner: NgxSpinnerService, private notifier: NotifierService) { }
  public article: string = ""
  public location: Location = window.location
  cookieVal: string = "";
  id = 10;
  none: boolean = false;
  notificationData: any

  ngOnInit(): void {
    this.spinner.show()
    this.none=true

    this.notifications.getNotifications().subscribe((res) => {
      this.notificationData = res;
      this.none = false;
      this.notificationData = this.notificationData.data;
      console.log(this.notificationData);
      
      this.spinner.hide()
      console.log(res);
    })
    
  }

  markAll() {
    this.notifications.markAllAsRead().subscribe((res) => {
      this.notifications.getNotifications().subscribe((res) => {
        this.notificationData = res;
        this.notificationData = this.notificationData.data;
        this.notifier.notify("success", "All notifications are mark as read! ")
      })
    })
  }

  read(id){
    this.notifications.markAsRead(id).subscribe((res) => {
      this.notifications.getNotifications().subscribe((res) => {
        this.notificationData = res;
        this.notificationData = this.notificationData.data;
        this.notifier.notify("success", "Notification is mark as read!")
      })     
    })
    
  }


  delet(id){
    this.notifications.deleteNoti(id).subscribe((res) => {
      this.notifications.getNotifications().subscribe((res) => {
        this.notificationData = res;
        this.notificationData = this.notificationData.data;
        this.notifier.notify("success", "Notification was deleted!")
      })
    })
  }
}