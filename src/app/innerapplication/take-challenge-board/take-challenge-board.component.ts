import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-take-challenge-board',
  templateUrl: './take-challenge-board.component.html',
  styleUrls: ['./take-challenge-board.component.css'],
})
export class TakeChallengeBoardComponent implements OnInit {
  constructor(private user: UserService, private router: ActivatedRoute) {}
  userData: any = [];
  ngOnInit(): void {
    this.user.getUserById(this.router.snapshot.params.id).subscribe((res) => {
      console.log(res);
      this.userData = res;
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
