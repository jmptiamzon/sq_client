import { Component, OnInit } from '@angular/core';
import { GetsetService } from '../services/getset.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  private currentUser: any;
  private isLinear = false;

  constructor(
    private getSet: GetsetService,
  ) {
    this.getSet.appTitle = 'Help';
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
