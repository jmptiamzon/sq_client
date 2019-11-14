import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private backendService: BackendService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      if (Number(res["data"][0].status) === 0) {
        this.router.navigate(['maintenance']);
      }
    });

    const id = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('token');

    this.querySubscription = this.backendService.addUserLog(15, id, token).subscribe((res) => {

    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
