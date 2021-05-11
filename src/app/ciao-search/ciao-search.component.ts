import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Ciao } from '../ciao';
import { CiaoService } from '../ciao.service';

@Component({
  selector: 'app-ciao-search',
  templateUrl: './ciao-search.component.html',
  styleUrls: [ './ciao-search.component.css' ]
})
export class CiaoSearchComponent implements OnInit {
  ciaos$: Observable<Ciao[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: CiaoService) {}

  
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ciaos$ = this.searchTerms.pipe(
      
      debounceTime(300),

      
      distinctUntilChanged(),

     
      switchMap((term: string) => this.heroService.searchCiaos(term)),
    );
  }
}
