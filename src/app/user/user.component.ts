import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BackendService } from './components/services/backend.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private titleService: Title,
    private router: Router,
    private backendService: BackendService,
  ) {
    this.titleService.setTitle('OACC');
  }

  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      sessionStorage.setItem('token', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
      this.querySubscription = this.backendService.addVisitor(sessionStorage.getItem('token')).subscribe((res) => {
        sessionStorage.setItem('id', res["data"].insertId);
      });
    }
  }

  changePage(url: string) {
    this.router.navigate([url]);
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
