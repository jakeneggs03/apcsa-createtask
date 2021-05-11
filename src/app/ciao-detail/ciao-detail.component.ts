import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ciao } from '../ciao';
import { CiaoService } from '../ciao.service';

@Component({
  selector: 'app-ciao-detail',
  templateUrl: './ciao-detail.component.html',
  styleUrls: [ './ciao-detail.component.css' ]
})
export class CiaoDetailComponent implements OnInit {
  ciao: Ciao;

  constructor(
    private route: ActivatedRoute,
    private ciaoService: CiaoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCiao();
  }

  getCiao(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ciaoService.getCiao(id)
      .subscribe(ciao => this.ciao = ciao);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.ciaoService.updateCiao(this.ciao)
      .subscribe(() => this.goBack());
  }
}
