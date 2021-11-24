import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  setInfo(key: string, data: any) {
    const jsonData = JSON.stringify(data);
    this.localStorage.setItem(key, jsonData);
  }

  getInfo(key: string): any {
    return JSON.parse(this.localStorage.getItem(key) || '{}');
  }

  clearInfo(key: string) {
    this.localStorage.removeItem(key);
  }

  clearAllLocalStorage() {
    this.localStorage.clear();
  }
}
