import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetsetService } from './components/services/getset.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pageName = 'Dashboard';

  constructor(
    private route: Router,
    private getSet: GetsetService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Admin Access');
  }

  changeAppName(page: string, url: string) {
    this.pageName = page;
    this.route.navigate([url]);
  }

  ngOnInit() {
    this.pageName = this.getSet.appTitle;
  }




  destroySession() {
    this.getSet.updateLogs(11, 0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    this.route.navigate(['/admin/login']);
  }

}
