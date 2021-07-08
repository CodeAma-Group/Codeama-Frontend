import { Component } from '@angular/core';
import { AppsettingsService } from './appsettings.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codeAma';

  constructor(private settings:AppsettingsService) {
    this.settings.settings()
  }
}
