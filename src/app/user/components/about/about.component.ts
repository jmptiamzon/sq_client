import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit() {
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
