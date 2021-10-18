import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../dashboard/dashboard.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private notifications: NotificationService, private spinner: NgxSpinnerService) { }
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
      this.spinner.hide()
    })
  }

  markAll() {
    this.notifications.markAllAsRead().subscribe((res) => {
      this.notifications.getNotifications().subscribe((res) => {
        this.notificationData = res;
        this.notificationData = this.notificationData.data;
      })
    })
  }
}