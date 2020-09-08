import { Component, OnInit } from '@angular/core';

import { PackageSearchService, NpmPackageInfo } from './package-search.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  styleUrls: ['./package-search.component.css'],
  providers: [
    PackageSearchService,
  ]
})
export class PackageSearchComponent implements OnInit {
  withRefresh = false;
  packages$: Observable<NpmPackageInfo[]>;
  private searchText$ = new Subject<string>();

  constructor(private packageSearchService: PackageSearchService) { }

  ngOnInit(): void {
    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName => this.packageSearchService.search(packageName, this.withRefresh))
    );
  }

  search(packageName: string): void {
    this.searchText$.next(packageName);
  }

  toggleRefresh(): void {
    this.withRefresh = !this.withRefresh;
  }

}
