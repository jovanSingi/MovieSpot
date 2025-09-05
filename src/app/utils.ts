import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor() { }

  public formatDate(iso: string): string {
    return new Date (iso).toLocaleString('sr-RS')
  }
}