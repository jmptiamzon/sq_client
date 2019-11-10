import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../assets/css/froala_blocks.css', './home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  querySubscription: any;

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    const id = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('token');

    this.querySubscription = this.backendService.addUserLog(14, id, token).subscribe((res) => {

    });
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
