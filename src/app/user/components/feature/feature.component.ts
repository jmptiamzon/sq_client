import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    const id = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('token');

    this.querySubscription = this.backendService.addUserLog(16, id, token).subscribe((res) => {

    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
