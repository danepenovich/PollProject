import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { PollService } from '../poll.service';
import { Poll } from '../poll';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  currentUser: User = new User();
  polls: Poll[];

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _pollService: PollService
  ) { }

  ngOnInit() {
    this._userService.session((res) =>{
      if(res.status === false){
        this._router.navigateByUrl('/');
      }else{
        this.currentUser = res;
      }
    });
    this.getPolls();
  }

  destroyPoll(id: string){
    this._pollService.destroy(id, (res) => {
      if(res.status === true){
        this.getPolls();
      }
    });
  }

  getPolls(){
    this._pollService.index((polls) => this.polls = polls);
  }

  logout(){
    this._userService.logout(res => this._router.navigateByUrl('/'));
  }

}
