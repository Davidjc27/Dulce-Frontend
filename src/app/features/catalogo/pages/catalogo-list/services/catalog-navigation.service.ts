import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogNavigationService {
  private readonly navigationSubject = new Subject<Params>();

  get navigation$(): Observable<Params> {
    return this.navigationSubject.asObservable();
  }

  trigger(overrides: Params): void {
    this.navigationSubject.next(overrides);
  }
}