import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle('OACC');
  }

  ngOnInit() {
  }
}
