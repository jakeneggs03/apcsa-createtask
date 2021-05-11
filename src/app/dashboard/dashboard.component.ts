import { Component, OnInit } from '@angular/core';
import { Ciao } from '../ciao';
import { CiaoService } from '../ciao.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  ciaos: Ciao[] = [];

  constructor(private CiaoService: CiaoService) { }

  ngOnInit() {
    this.getCiaos();
  }

  getCiaos(): void {
    this.CiaoService.getCiaos()
      .subscribe(ciaos => this.ciaos = ciaos.slice(1, 5));
  }
}
