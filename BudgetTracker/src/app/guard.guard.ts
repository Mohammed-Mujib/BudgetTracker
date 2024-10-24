import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from './data.service';

export const guardGuard: CanActivateFn = (route, state) => {
  let dataService = inject(DataService);
  let router = inject(Router)
  let logined ;
  dataService.isLogined.subscribe(
      v => {logined= v;}
    )
  if (logined) {
    return true
  }
  else{
    router.navigate(['login']);
    return false
  }
};
