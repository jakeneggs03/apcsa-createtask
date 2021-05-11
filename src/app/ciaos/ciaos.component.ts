import { Component, OnInit } from '@angular/core';

import { Ciao } from '../ciao';
import { CiaoService } from '../ciao.service';

@Component({
  selector: 'app-ciaos',
  templateUrl: './ciaos.component.html',
  styleUrls: ['./ciao.component.css']
})
export class CiaosComponent implements OnInit {
  ciaos: Ciao[];

  constructor(private ciaoService: CiaoService) { }

  ngOnInit() {
    this.getCiaos();
  }

  getCiaos(): void {
    this.ciaoService.getCiaos()
    .subscribe(ciaos => this.ciaos = ciaos);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.ciaoService.addCiao({ name } as Ciao)
      .subscribe(ciao => {
        this.ciaos.push(ciao);
      });
  }

  delete(ciao: Ciao): void {
    this.ciaos = this.ciaos.filter(h => h !== ciao);
    this.ciaoService.deleteCiao(ciao.id).subscribe();
  }

}
