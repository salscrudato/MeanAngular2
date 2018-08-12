import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {OddsService} from '../../services/odds.service';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-straight',
  templateUrl: './straight.component.html',
  styleUrls: ['./straight.component.css']
})
export class StraightComponent implements OnInit {

  actions:any = [];
  sport:number;

  constructor(
    private oddsService:OddsService,
    private authService:AuthService,
    private router:Router,
    private dataService:DataService,
    private flashMessage:FlashMessagesService
  ) {}

  ngOnInit() {
    var tempActions = this.dataService.getJsonOddsEvents();
    this.sport = this.dataService.getSports();
    this.setUpActions(tempActions, this.sport);
  }

  setUpActions(tempActions, sport){
    for (var i = 0; i < tempActions.length; i++){
      if(tempActions[i].sport == sport){
        this.actions.push(tempActions[i]);
      }
    }
  }

  //-----Old Method-----
  // getOdds(){
  //   this.oddsService.getOdds().subscribe(data =>{
  //     for (var i = 0; i < data.length; i++) {
  //       //MLB Odds are sport = 0
  //       if(data[i].sport == 0){
  //         this.actions.push(data[i]);
  //       }
  //     }
  //   });
  // }

  placeBet(action,type){
    action.betType = type;
    this.authService.getProfile().subscribe(profile => {
      this.dataService.addStraightBet(action, profile, 'straight');
      this.router.navigate(['confirm']);
    },
    err =>{
      this.flashMessage.show('You must be logged in to place a bet.', {cssClass: 'alert-danger'});
      return false;
    });
  }

}
