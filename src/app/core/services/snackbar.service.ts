import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  openSnackBar(message: string) {
    alert(message);
  }
}
