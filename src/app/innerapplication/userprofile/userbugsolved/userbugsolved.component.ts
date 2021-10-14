import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute} from '@angular/router';
import { AppsettingsService } from '../../../appsettings.service'
import { AuthService } from '../../../authentication/_authServices/auth.service'
import { InnerapplicationService } from '../../innerapplication.service';
import { BugService } from '../../services/bug.service';

@Component({
  selector: 'app-userbugsolved',
  templateUrl: './userbugsolved.component.html',
  styleUrls: ['./userbugsolved.component.css']
})
export class UserbugsolvedComponent implements OnInit {

  constructor(private bug: BugService) {}
  technologies = [
    {
      name: 'vue',
      img: '../../../../assets/test_images/vue.png',
    },
    {
      name: 'angular',
      img: '../../../../assets/test_images/angular.png',
    },
    {
      name: 'c',
      img: '../../../../assets/test_images/c.png',
    },
    {
      name: 'java',
      img: '../../../../assets/test_images/java.png',
    },
    {
      name: 'react',
      img: '../../../../assets/test_images/react.png',
    },
    {
      name: 'js',
      img: '../../../../assets/test_images/js.png',
    },
    {
      name: 'python',
      img: '../../../../assets/test_images/python.png',
    },
    {
      name: 'swift',
      img: '../../../../assets/test_images/swift.png',
    },
  ];
  techImage: string;
  checkTechImage(name: string) {
    for (let i = 0; i < this.technologies.length; i++) {
      if (this.technologies[i].name == name) {
        this.techImage = this.technologies[i].img;
      }
    }
    return this.techImage;
  }
  bugs: any;
  ngOnInit(): void {
    this.bug.getBugs().subscribe((result) => {
      this.bugs = result;
      this.bugs = this.bugs.data;
    });
  }
  checkBadge(badge: string) {
    let className: string = '';
    switch (badge.toLowerCase()) {
      case 'absolute beginner':
        className = 'absBeg';
        break;
      case 'intermediate':
        className = 'interm';
        break;
      case 'pro':
        className = 'pro';
        break;
      default:
        className = 'beginner';
    }
    return className;
  }

}
