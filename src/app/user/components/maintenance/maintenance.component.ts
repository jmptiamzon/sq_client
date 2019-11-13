import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private backendService: BackendService,
    private router: Router,
    private titleService: Title,
  ) {
    titleService.setTitle('Maintenance');
  }

  ngOnInit() {
    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      if (Number(res["data"][0].status) === 1) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
