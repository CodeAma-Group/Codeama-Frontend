import { Component, OnInit } from '@angular/core';

import { AppsettingsService } from '../../appsettings.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private _settings: AppsettingsService ) { }

  ngOnInit(): void {
    this._settings.settings();
  }


}
